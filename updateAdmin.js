import fs from 'fs';

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// Replace imports
content = content.replace("import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, updateDoc } from 'firebase/firestore';", "import { api, blobToBase64 } from '../lib/api';");
content = content.replace("import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';", "");

// Replace fetchData
content = content.replace(/const fetchData = async \(\) => \{[\s\S]*?\} catch \(err: any\) \{/m, `const fetchData = async () => {
    try {
      const jData = await api.getJewelries();
      setJewelries(jData);
      
      const catData = await api.getCollections();
      const allCategories = [...catData, ...catData]; // Fixed later
      setCategories(catData);
      
      if (catData.length > 0 && !collectionId) {
         setCollectionId(catData[0].id);
      }

      const bData = await api.getBanners();
      setHeroBanners(bData);

    } catch (err: any) {`);

// Replace jewelry upload
content = content.replace(/const fileRef = ref\(storage, \`jewelries\/\$\{Date\.now\(\)\}_\$\{fileName\}\`\);[\s\S]*?setUploadProgress\(null\);/m, `finalImageUrl = await blobToBase64(compressedBlob);`);

// Replace newJewelry addDoc
content = content.replace(/const newJewelry: any = \{[\s\S]*?\};\s*if \(price\) \{\s*newJewelry\.price = Number\(price\);\s*\}\s*await addDoc\(collection\(db, 'jewelries'\), newJewelry\);/m, `const newJewelry: any = {
        title,
        description,
        collectionId,
        imageUrl: finalImageUrl,
      };
      if (price) {
        newJewelry.price = Number(price);
      }
      await api.addJewelry(newJewelry);`);


// Replace category upload
content = content.replace(/const fileRef = ref\(storage, \`categories\/\$\{Date\.now\(\)\}_\$\{fileName\}\`\);[\s\S]*?setUploadProgress\(null\);/m, `finalImageUrl = await blobToBase64(compressedBlob);`);

// Replace newCategory addDoc
content = content.replace(/const newCategory: any = \{[\s\S]*?\};\s*await addDoc\(collection\(db, 'collections'\), newCategory\);/m, `const newCategory: any = {
        title: catTitle,
        description: catDescription,
        imageUrl: finalImageUrl,
      };
      await api.addCollection(newCategory);`);


// Replace banner upload
content = content.replace(/const fileRef = ref\(storage, \`banners\/\$\{Date\.now\(\)\}_\$\{fileName\}\`\);[\s\S]*?setUploadProgress\(null\);/m, `finalImageUrl = await blobToBase64(compressedBlob);`);

content = content.replace(/const newBanner = \{[\s\S]*?\};\s*await addDoc\(collection\(db, 'heroBanners'\), newBanner\);/m, `const newBanner = {
        title: bannerTitle,
        subtitle: bannerSubtitle,
        buttonText: bannerButtonText,
        buttonLink: bannerButtonLink,
        imageUrl: finalImageUrl,
        enabled: true,
        order: heroBanners.length,
      };
      await api.addBanner(newBanner);`);

// Delete
content = content.replace(/if \(itemToDelete.type === 'jewelry'\) await deleteDoc\(doc\(db, 'jewelries', itemToDelete\.id\)\);\s*else if \(itemToDelete\.type === 'category'\) await deleteDoc\(doc\(db, 'collections', itemToDelete\.id\)\);\s*else if \(itemToDelete\.type === 'banner'\) await deleteDoc\(doc\(db, 'heroBanners', itemToDelete\.id\)\);/m, `await api.deleteItem(itemToDelete.type, itemToDelete.id);`);

// Toggle Banner
content = content.replace(/await updateDoc\(doc\(db, 'heroBanners', id\), \{\s*enabled: !banner.enabled,\s*\}\);/m, `await api.toggleBanner(id, !banner.enabled);`);

// Move Banner Up
content = content.replace(/await updateDoc\(doc\(db, 'heroBanners', currentBanner.id\), \{\s*order: currentBanner.order - 1\s*\}\);\s*await updateDoc\(doc\(db, 'heroBanners', targetBanner.id\), \{\s*order: targetBanner.order \+ 1\s*\}\);/m, `await api.reorderBanners([{ id: currentBanner.id, order: currentBanner.order - 1 }, { id: targetBanner.id, order: targetBanner.order + 1 }]);`);

// Move Banner Down
content = content.replace(/await updateDoc\(doc\(db, 'heroBanners', currentBanner.id\), \{\s*order: currentBanner.order \+ 1\s*\}\);\s*await updateDoc\(doc\(db, 'heroBanners', targetBanner.id\), \{\s*order: targetBanner.order - 1\s*\}\);/m, `await api.reorderBanners([{ id: currentBanner.id, order: currentBanner.order + 1 }, { id: targetBanner.id, order: targetBanner.order - 1 }]);`);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
