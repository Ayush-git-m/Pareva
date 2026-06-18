import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { api, blobToBase64 } from '../lib/api';

import { Trash2, Plus, Image as ImageIcon, Loader2, Power, ArrowUp, ArrowDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const maxWidth = 1600;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas conversion failed'));
        }, 'image/webp', 0.8);
      };
      img.onerror = () => reject(new Error('Image loading failed'));
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [jewelries, setJewelries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jewelries' | 'categories' | 'banners' | 'settings'>('jewelries');

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [bridalVideoUrl, setBridalVideoUrl] = useState('');
  const [goldRate22k, setGoldRate22k] = useState('');
  const [goldRate24k, setGoldRate24k] = useState('');
  const [forHimCollectionIds, setForHimCollectionIds] = useState<string[]>([]);
  const [forHerCollectionIds, setForHerCollectionIds] = useState<string[]>([]);
  
  // jewellery State
 const [editingItem, setEditingItem] = useState<any>(null);
const [editType, setEditType] = useState<'jewellery' | 'category' | null>(null);
const [editTitle, setEditTitle] = useState('');
const [editDescription, setEditDescription] = useState('');
const [editPrice, setEditPrice] = useState('');
const [editWeight, setEditWeight] = useState('');
const [editCarat, setEditCarat] = useState('');
const [editImagePreview, setEditImagePreview] = useState('');
const [editImageFile, setEditImageFile] = useState<File | null>(null);
const [editCollectionId, setEditCollectionId] = useState('');
const [editGender, setEditGender] = useState<'none' | 'him' | 'her' | 'unisex'>('none');  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [carat, setCarat] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [gender, setGender] = useState<'none' | 'him' | 'her' | 'unisex'>('none');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);


  // Category State
  const [catTitle, setCatTitle] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImagePreview, setCatImagePreview] = useState('');
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catGenderAssignment, setCatGenderAssignment] = useState<'none' | 'him' | 'her'>('none');

  // Banner State
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerButtonText, setBannerButtonText] = useState('');
  const [bannerButtonLink, setBannerButtonLink] = useState('');
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState('');

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'jewellery' | 'category' | 'banner' } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        if (currentUser.email === 'ayushclasses10@gmail.com' || currentUser.email === 'shreeparevajewellers@gmail.com') {
          setUser(currentUser);
          fetchData();
        } else {
          setUser(null);
          setError('Unauthorized: Your email address is not permitted to access the admin dashboard.');
          signOut(auth);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const jData = await api.getJewelries();
      setJewelries(jData);
      
      const catData = await api.getCollections();
      const allCategories = [...catData]; // Corrected
      setCategories(allCategories);
      
      if (catData.length > 0 && !collectionId) {
         setCollectionId(catData[0].id);
      }

      const bData = await api.getBanners();
      setHeroBanners(bData);

      const sData = await api.getSettings();
      setSettings(sData);
      if (sData.bridalVideoUrl) {
         setBridalVideoUrl(sData.bridalVideoUrl);
      }
      if (sData.goldRate22k) {
         setGoldRate22k(sData.goldRate22k);
      }
      if (sData.goldRate24k) {
         setGoldRate24k(sData.goldRate24k);
      }
      if (sData.forHimCollectionId) {
         try {
            const parsed = JSON.parse(sData.forHimCollectionId);
            setForHimCollectionIds(Array.isArray(parsed) ? parsed : [sData.forHimCollectionId]);
         } catch {
            setForHimCollectionIds([sData.forHimCollectionId]);
         }
      }
      if (sData.forHerCollectionId) {
         try {
            const parsed = JSON.parse(sData.forHerCollectionId);
            setForHerCollectionIds(Array.isArray(parsed) ? parsed : [sData.forHerCollectionId]);
         } catch {
            setForHerCollectionIds([sData.forHerCollectionId]);
         }
      }

    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch data.');
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error(err);
    }
  };

  const checkFileSize = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB max
      setError('Image is too large! Please upload images under 10MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && checkFileSize(file)) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(checkFileSize);
    
    if (validFiles.length > 0) {
      setAdditionalFiles(prev => [...prev, ...validFiles]);
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
  };
  const openEditModal = (item: any, type: 'jewellery' | 'category') => {
  setEditingItem(item);
  setEditType(type);
  setEditTitle(item.title);
  setEditDescription(item.description);
  setEditImagePreview(item.imageUrl);
  setEditImageFile(null);
  if (type === 'jewellery') {
    setEditPrice(item.price ? String(item.price) : '');
    setEditWeight(item.weight || '');
    setEditCarat(item.carat || '');
    setEditCollectionId(item.collectionId ? String(item.collectionId) : '');
    setEditGender(item.gender || 'none');
  }
};

const closeEditModal = () => {
  setEditingItem(null);
  setEditType(null);
};

const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && checkFileSize(file)) {
    setEditImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setEditImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }
};

const handleSaveEdit = async () => {
  setIsSubmitting(true);
  setError('');
  try {
    let finalImageUrl = editImagePreview;
    if (editImageFile) {
      const compressedBlob = await compressImage(editImageFile);
      finalImageUrl = await blobToBase64(compressedBlob);
    }

    if (editType === 'jewellery') {
      await api.updateJewellery(String(editingItem.id), {
        title: editTitle,
        description: editDescription,
        price: editPrice ? Number(editPrice) : null,
        weight: editWeight || null,
        carat: editCarat || null,
        imageUrl: finalImageUrl,
        collectionId: editCollectionId,
        gender: editGender === 'none' ? null : editGender,
      });
    } else if (editType === 'category') {
      await api.updateCollection(String(editingItem.id), {
        title: editTitle,
        description: editDescription,
        imageUrl: finalImageUrl,
      });
    }

    setSuccessMsg('Updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
    closeEditModal();
    await fetchData();
  } catch (err: any) {
    setError(err.message || 'Error updating item');
  } finally {
    setIsSubmitting(false);
  }
};
  const handleCatImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && checkFileSize(file)) {
      setCatImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && checkFileSize(file)) {
      setBannerImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('Video is too large! Please upload videos under 50MB.');
      return;
    }
    
    setError('');
    setUploadingVideo(true);
    setVideoUploadProgress(0);

    const fileRef = ref(storage, `videos/bridal_${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoUploadProgress(progress);
      },
      (error) => {
        console.error("Video upload error:", error);
        setError('Error uploading video.');
        setUploadingVideo(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setBridalVideoUrl(downloadURL);
        setUploadingVideo(false);
        setSuccessMsg('Video uploaded successfully! Make sure to save settings.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    );
  };

  const handleaddJewellery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || (!imagePreview && !imageFile)) {
      setError('Please fill in all required fields and upload an image.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      let finalImageUrl = imagePreview;

      if (imageFile) {
        const compressedBlob = await compressImage(imageFile);
        finalImageUrl = await blobToBase64(compressedBlob);
      }

      const finalAdditionalUrls: string[] = [];
      for (let i = 0; i < additionalFiles.length; i++) {
        const compressedBlob = await compressImage(additionalFiles[i]);
        const b64 = await blobToBase64(compressedBlob);
        finalAdditionalUrls.push(b64);
      }

      const newjewellery: any = {
        title,
        description,
        collectionId,
        imageUrl: finalImageUrl,
        imageUrls: finalAdditionalUrls.length > 0 ? finalAdditionalUrls : null,
      };
      if (gender !== 'none') {
        newjewellery.gender = gender;
      }
      if (price) {
        newjewellery.price = Number(price);
      }
      if (weight) {
        newjewellery.weight = weight;
      }
      if (carat) {
        newjewellery.carat = carat;
      }
      await api.addJewellery(newjewellery);
      
      setTitle('');
      setDescription('');
      setPrice('');
      setWeight('');
      setCarat('');
      setGender('none');
      setImageFile(null);
      setImagePreview('');
      setAdditionalFiles([]);
      setAdditionalPreviews([]);
      
      setSuccessMsg('jewellery uploaded and added successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
      
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error adding jewellery');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle || !catDescription || (!catImagePreview && !catImageFile)) {
      setError('Please fill in all required fields and upload an image.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      let finalImageUrl = catImagePreview;

      if (catImageFile) {
        const compressedBlob = await compressImage(catImageFile);
        const fileName = catImageFile.name.split('.')[0] + '.webp';
        finalImageUrl = await blobToBase64(compressedBlob);
      }

      const newCategory: any = {
        title: catTitle,
        description: catDescription,
        imageUrl: finalImageUrl,
      };
      const createdCategory = await api.addCollection(newCategory);
      
      if (catGenderAssignment === 'him') {
         const newForHimIds = [...forHimCollectionIds, String(createdCategory.id)];
         await api.updateSettings({
            forHimCollectionId: JSON.stringify(newForHimIds)
         });
         setForHimCollectionIds(newForHimIds);
      } else if (catGenderAssignment === 'her') {
         const newForHerIds = [...forHerCollectionIds, String(createdCategory.id)];
         await api.updateSettings({
            forHerCollectionId: JSON.stringify(newForHerIds)
         });
         setForHerCollectionIds(newForHerIds);
      }
      
      setCatTitle('');
      setCatDescription('');
      setCatImagePreview('');
      setCatImageFile(null);
      setCatGenderAssignment('none');
      
      setSuccessMsg('Category uploaded and added successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
      
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error adding category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerImagePreview && !bannerImageFile) {
      setError('Please provide a banner image.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let finalImageUrl = bannerImagePreview;

      if (bannerImageFile) {
        const compressedBlob = await compressImage(bannerImageFile);
        const fileName = bannerImageFile.name.split('.')[0] + '.webp';
        finalImageUrl = await blobToBase64(compressedBlob);
      }

      const maxOrder = heroBanners.length > 0 ? Math.max(...heroBanners.map(b => b.order ?? 0)) : 0;
      const newBanner = {
        title: bannerTitle,
        subtitle: bannerSubtitle,
        buttonText: bannerButtonText,
        buttonLink: bannerButtonLink,
        imageUrl: finalImageUrl,
        enabled: true,
        order: maxOrder + 1,
      };
      await api.addBanner(newBanner);

      setBannerTitle('');
      setBannerSubtitle('');
      setBannerButtonText('');
      setBannerButtonLink('');
      setBannerImageFile(null);
      setBannerImagePreview('');
      
      setSuccessMsg('Banner uploaded and added successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);

      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error adding banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJ = async (id: string) => {
    setItemToDelete({ id, type: 'jewellery' });
  };

  const handleDeleteC = async (id: string) => {
    setItemToDelete({ id, type: 'category' });
  };

  const handleDeleteBanner = async (id: string) => {
    setItemToDelete({ id, type: 'banner' });
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await api.updateSettings({
         bridalVideoUrl: bridalVideoUrl,
         goldRate22k: goldRate22k,
         goldRate24k: goldRate24k,
         forHimCollectionId: JSON.stringify(forHimCollectionIds),
         forHerCollectionId: JSON.stringify(forHerCollectionIds)
      });
      setSuccessMsg('Settings updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error updating settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.deleteItem(itemToDelete.type, itemToDelete.id);
      await fetchData();
      setItemToDelete(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error deleting item');
    }
  };

  const toggleBannerEnabled = async (id: number, currentStatus: boolean) => {
    try {
      await api.toggleBanner(id, !currentStatus);
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error toggling banner status');
    }
  };

  const handleMoveBanner = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === heroBanners.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newBanners = [...heroBanners];
    const [item] = newBanners.splice(index, 1);
    newBanners.splice(newIndex, 0, item);

    try {
      const itemsToUpdate = newBanners.map((banner, idx) => ({
        id: banner.id,
        order: idx
      }));
      await api.reorderBanners(itemsToUpdate);
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError('Error reordering banners: ' + (err.message || 'unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl luxury-shadow max-w-sm w-full mx-auto">
            <h3 className="text-title-lg text-primary font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setItemToDelete(null)} 
                className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-6 py-2 bg-error text-white font-medium rounded-full hover:bg-error/90 transition-colors shadow-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
{editingItem && (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-2xl luxury-shadow w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
      <h3 className="text-title-lg text-primary font-semibold mb-4">
        Edit {editType === 'jewellery' ? 'Jewellery' : 'Category'}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-body-sm font-medium text-on-surface mb-1">Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-body-sm font-medium text-on-surface mb-1">Description</label>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {editType === 'jewellery' && (
          <>
            <div>
              <label className="block text-body-sm font-medium text-on-surface mb-1">Category</label>
              <select
                value={editCollectionId}
                onChange={(e) => setEditCollectionId(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-1">Price</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-1">Weight</label>
                <input
                  type="text"
                  value={editWeight}
                  onChange={(e) => setEditWeight(e.target.value)}
                  placeholder="e.g. 5g"
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium text-on-surface mb-1">Carat</label>
                <input
                  type="text"
                  value={editCarat}
                  onChange={(e) => setEditCarat(e.target.value)}
                  placeholder="e.g. 22KT"
                  className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-on-surface mb-1">Gender Category</label>
              <select
                value={editGender}
                onChange={(e) => setEditGender(e.target.value as any)}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="none">None</option>
                <option value="him">For Him</option>
                <option value="her">For Her</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-body-sm font-medium text-on-surface mb-1">Image</label>
          <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center cursor-pointer hover:bg-surface-container-low transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className="hidden"
              id="editImageUpload"
            />
            <label htmlFor="editImageUpload" className="cursor-pointer flex flex-col items-center">
              {editImagePreview ? (
                <img src={editImagePreview} alt="Preview" className="h-32 object-contain mb-2" />
              ) : (
                <ImageIcon className="w-8 h-8 text-on-surface-variant mb-2" />
              )}
              <span className="text-body-sm text-primary">Click to change image</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={closeEditModal}
          className="px-4 py-2 text-on-surface-variant hover:text-on-surface font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-on-secondary-container transition-colors shadow-sm"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
)}
      <Header />
      <div className="flex-1 max-w-container-max mx-auto px-gutter py-12 w-full">
        {!user ? (
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl luxury-shadow">
            <h1 className="text-headline-md text-primary mb-6 font-headline-md">Admin Login</h1>
            <p className="text-body-md text-on-surface-variant mb-8">
              Please sign in with your authorized Google account to access the admin panel.
            </p>
            {error && <p className="text-error mb-4">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors"
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-display-sm text-primary font-display-sm">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-primary hover:underline flex items-center gap-2"
              >
                <Power className="w-5 h-5"/> Sign Out
              </button>
            </div>
            
            {error && <div className="bg-error/10 text-error p-4 rounded-lg mb-8">{error}</div>}
            {successMsg && <div className="bg-[#128C7E]/10 text-[#128C7E] p-4 rounded-lg mb-8">{successMsg}</div>}

            <div className="flex space-x-4 mb-8 border-b border-outline-variant/30 overflow-x-auto">
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors whitespace-nowrap ${activeTab === 'jewelries' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('jewelries')}
              >
                Jewelries
              </button>
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors whitespace-nowrap ${activeTab === 'categories' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('categories')}
              >
                Categories
              </button>
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors whitespace-nowrap ${activeTab === 'banners' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('banners')}
              >
                Hero Banners
              </button>
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>

            {activeTab === 'jewelries' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl luxury-shadow sticky top-24">
                    <h2 className="text-title-lg text-primary mb-6">Add New jewellery</h2>
                    <form onSubmit={handleaddJewellery} className="space-y-4">
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Category</label>
                        <select
                          value={collectionId}
                          onChange={(e) => setCollectionId(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          required
                        >
                          <option value="" disabled>Select a category</option>
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-body-sm font-medium text-on-surface mb-1">Price (Optional)</label>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-body-sm font-medium text-on-surface mb-1">Weight (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. 10g"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-body-sm font-medium text-on-surface mb-1">Carat (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. 22K"
                            value={carat}
                            onChange={(e) => setCarat(e.target.value)}
                            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Gender Category</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value as any)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                        >
                          <option value="none">None</option>
                          <option value="him">For Him</option>
                          <option value="her">For Her</option>
                          <option value="unisex">Unisex</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Primary Image (Required)</label>
                        <input
                          type="text"
                          placeholder="Paste an external image URL here (ImgBB, Cloudinary, etc.)"
                          value={imagePreview && imagePreview.startsWith('http') ? imagePreview : ''}
                          onChange={(e) => setImagePreview(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary mb-3"
                        />
                        <div className="text-center text-xs text-on-surface-variant mb-2">OR UPLOAD FILE</div>
                        <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center cursor-pointer hover:bg-surface-container-low transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="imageUpload"
                          />
                          <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                            {imagePreview ? (
                              <img src={imagePreview} alt="Preview" className="h-32 object-contain mb-2" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-on-surface-variant mb-2" />
                            )}
                            <span className="text-body-sm text-primary">Click to select primary image</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Additional Images (Optional)</label>
                        <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center cursor-pointer hover:bg-surface-container-low transition-colors mb-3">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleAdditionalImagesChange}
                            className="hidden"
                            id="additionalImagesUpload"
                          />
                          <label htmlFor="additionalImagesUpload" className="cursor-pointer flex flex-col items-center">
                            <ImageIcon className="w-6 h-6 text-on-surface-variant mb-2" />
                            <span className="text-body-sm text-primary">Select additional images</span>
                          </label>
                        </div>
                        {additionalPreviews.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {additionalPreviews.map((preview, idx) => (
                              <div key={idx} className="relative group w-16 h-16 rounded overflow-hidden border border-outline/30 luxury-shadow">
                                <img src={preview} alt="Additional Preview" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeAdditionalImage(idx)}
                                  className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                             <Loader2 className="w-5 h-5 animate-spin" /> 
                             {uploadProgress !== null ? `Uploading... ${Math.round(uploadProgress)}%` : 'Processing...'}
                          </div>
                        ) : (
                          <><Plus className="w-5 h-5" /> Add jewellery </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-title-lg text-primary mb-6">Manage Inventory</h2>
                  {jewelries.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl luxury-shadow text-center text-on-surface-variant">
                      No jewelries found. Add your first piece!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {jewelries.map(item => (
                        <div key={item.id} className="bg-white rounded-xl luxury-shadow overflow-hidden flex flex-col">
                          <div className="bg-surface-container-low p-4 h-48 flex items-center justify-center">
                            <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-label-lg text-on-surface font-semibold line-clamp-1 flex-1 mr-2">{item.title}</h3>
                              <span className="bg-surface-container-low text-primary text-xs px-2 py-1 rounded-full uppercase tracking-wider">
                                {categories.find(c => c.id === item.collectionId)?.title || 'Unknown'}
                              </span>
                            </div>
                            <p className="text-body-sm text-on-surface-variant mb-4 line-clamp-2 flex-1">{item.description}</p>
                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/30">
                              <span className="text-label-md text-primary font-medium">
                                {item.price ? `₹${item.price.toLocaleString()}` : 'Price on request'}
                              </span>
                              <div className="flex gap-2">
  <button
    onClick={() => openEditModal(item, 'jewellery')}
    className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
    title="Edit"
  >
    ✏️
  </button>
  <button
    onClick={() => handleDeleteJ(item.id)}
    className="text-error hover:bg-error/10 p-2 rounded-full transition-colors"
    title="Delete"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl luxury-shadow sticky top-24">
                    <h2 className="text-title-lg text-primary mb-6">Add New Category</h2>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Title</label>
                        <input
                          type="text"
                          value={catTitle}
                          onChange={(e) => setCatTitle(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Description</label>
                        <textarea
                          value={catDescription}
                          onChange={(e) => setCatDescription(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Image URL or File Upload (limit 10MB auto-compressed)</label>
                        <input
                          type="text"
                          placeholder="Paste an external image URL here (ImgBB, Cloudinary, etc.)"
                          value={catImagePreview && catImagePreview.startsWith('http') ? catImagePreview : ''}
                          onChange={(e) => setCatImagePreview(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary mb-3"
                        />
                        <div className="text-center text-xs text-on-surface-variant mb-2">OR UPLOAD FILE</div>
                        <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center cursor-pointer hover:bg-surface-container-low transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCatImageChange}
                            className="hidden"
                            id="catImageUpload"
                          />
                          <label htmlFor="catImageUpload" className="cursor-pointer flex flex-col items-center">
                            {catImagePreview ? (
                              <img src={catImagePreview} alt="Preview" className="h-32 object-contain mb-2" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-on-surface-variant mb-2" />
                            )}
                            <span className="text-body-sm text-primary">Click to select image (Max 10MB)</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Add to Frontpage Gender Collection (Optional)</label>
                        <select
                           value={catGenderAssignment}
                           onChange={(e) => setCatGenderAssignment(e.target.value as any)}
                           className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                        >
                           <option value="none">None</option>
                           <option value="him">For Him</option>
                           <option value="her">For Her</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                             <Loader2 className="w-5 h-5 animate-spin" /> 
                             {uploadProgress !== null ? `Uploading... ${Math.round(uploadProgress)}%` : 'Processing...'}
                          </div>
                        ) : (
                          <><Plus className="w-5 h-5" /> Add Category </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-title-lg text-primary mb-6">Manage Categories</h2>
                  {categories.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl luxury-shadow text-center text-on-surface-variant">
                      No categories found. Add your first category!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {categories.map(cat => (
                        <div key={cat.id} className="bg-white rounded-xl luxury-shadow flex flex-col overflow-hidden">
                          <div className="bg-surface-container-low h-40 relative">
                            {cat.imageUrl ? (
                              <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-on-surface-variant" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
  <button
    onClick={(e) => { e.stopPropagation(); openEditModal(cat, 'category'); }}
    className="bg-white/90 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors luxury-shadow"
    title="Edit Category"
  >
    ✏️
  </button>
  <button
    onClick={(e) => { e.stopPropagation(); handleDeleteC(cat.id); }}
    className="bg-white/90 text-error hover:bg-error/10 p-2 rounded-full transition-colors luxury-shadow"
    title="Delete Category"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>
</div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-title-md text-on-surface font-semibold mb-2">{cat.title}</h3>
                            <p className="text-body-sm text-on-surface-variant line-clamp-2">{cat.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'banners' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl luxury-shadow sticky top-24">
                    <h2 className="text-title-lg text-primary mb-6">Add Hero Banner</h2>
                    <form onSubmit={handleAddBanner} className="space-y-4">
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Title (HTML Supported)</label>
                        <textarea
                          value={bannerTitle}
                          onChange={(e) => setBannerTitle(e.target.value)}
                          rows={2}
                          placeholder="Timeless Elegance.<br /><span class='text-luxury-gold'>Trusted For Generations.</span>"
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Subtitle</label>
                        <textarea
                          value={bannerSubtitle}
                          onChange={(e) => setBannerSubtitle(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-body-sm font-medium text-on-surface mb-1">Button Text (Optional)</label>
                          <input
                            type="text"
                            value={bannerButtonText}
                            onChange={(e) => setBannerButtonText(e.target.value)}
                            placeholder="Explore Now"
                            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-body-sm font-medium text-on-surface mb-1">Button Link</label>
                          <input
                            type="text"
                            value={bannerButtonLink}
                            onChange={(e) => setBannerButtonLink(e.target.value)}
                            placeholder="/#collections"
                            className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/30">
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Image URL or File Upload (limit 10MB auto-compressed)</label>
                        <p className="text-xs text-on-surface-variant mb-3">
                          For large high-res banners up to 10MB.
                        </p>
                        <input
                          type="text"
                          placeholder="Paste an external image URL here"
                          value={bannerImagePreview && bannerImagePreview.startsWith('http') ? bannerImagePreview : ''}
                          onChange={(e) => setBannerImagePreview(e.target.value)}
                          className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary mb-3"
                        />
                        <div className="text-center text-xs text-on-surface-variant mb-2">OR UPLOAD FILE</div>
                        <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center cursor-pointer hover:bg-surface-container-low transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageChange}
                            className="hidden"
                            id="bannerImageUpload"
                          />
                          <label htmlFor="bannerImageUpload" className="cursor-pointer flex flex-col items-center">
                            {bannerImagePreview ? (
                              <img src={bannerImagePreview} alt="Preview" className="h-24 object-cover mb-2" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-on-surface-variant mb-2" />
                            )}
                            <span className="text-body-sm text-primary">Click to select image (Max 10MB)</span>
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                             <Loader2 className="w-5 h-5 animate-spin" /> 
                             {uploadProgress !== null ? `Uploading... ${Math.round(uploadProgress)}%` : 'Processing...'}
                          </div>
                        ) : (
                          <><Plus className="w-5 h-5" /> Add Banner </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-title-lg text-primary mb-6">Manage Banners</h2>
                  {heroBanners.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl luxury-shadow text-center text-on-surface-variant">
                      No custom banners found. Added banners will replace the default homepage slider.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {heroBanners.map((banner, index) => (
                        <div key={banner.id} className={`bg-white rounded-xl luxury-shadow flex flex-col overflow-hidden ${!banner.enabled ? 'opacity-60' : ''}`}>
                          <div className="bg-surface-container-low h-48 relative">
                            <img src={banner.imageUrl} alt="Banner" className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex gap-2 z-10">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveBanner(index, 'up')}
                                  className="bg-white/90 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors luxury-shadow"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                              )}
                              {index < heroBanners.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveBanner(index, 'down')}
                                  className="bg-white/90 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors luxury-shadow"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                              )}
                              {banner.enabled !== false ? (
                                <button
                                  type="button"
                                  onClick={() => toggleBannerEnabled(banner.id, banner.enabled !== false)}
                                  className="bg-white/90 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors luxury-shadow"
                                  title="Disable Banner"
                                >
                                  <Power className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleBannerEnabled(banner.id, false)}
                                  className="bg-white/90 text-on-surface hover:bg-on-surface/10 p-2 rounded-full transition-colors luxury-shadow"
                                  title="Enable Banner"
                                >
                                  <Power className="w-4 h-4 text-on-surface-variant" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteBanner(banner.id)}
                                className="bg-white/90 text-error hover:bg-error/10 p-2 rounded-full transition-colors luxury-shadow"
                                title="Delete Banner"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute top-2 left-2 bg-white/90 text-primary font-bold px-3 py-1 rounded-full luxury-shadow text-xs z-10">
                              Slide {index + 1}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col">
                            <h3 className="text-label-lg text-on-surface font-semibold mb-2" dangerouslySetInnerHTML={{ __html: banner.title || 'Untitled Slide' }} />
                            <p className="text-body-sm text-on-surface-variant line-clamp-2">{banner.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-surface-container p-8 rounded-2xl luxury-shadow relative">
                    <h2 className="text-xl font-semibold mb-6 text-on-surface">General Settings</h2>
                    <form onSubmit={handleSaveSettings}>
                      <div className="mb-6">
                        <label className="block text-label-md font-medium text-on-surface mb-2">
                          Bridal Highlight Video URL (Hero section)
                        </label>
                        <input
                          type="url"
                          className="w-full border-b border-outline bg-transparent py-2 text-on-surface focus:border-primary focus:outline-none transition-colors mb-3"
                          value={bridalVideoUrl}
                          onChange={(e) => setBridalVideoUrl(e.target.value)}
                          placeholder="https://assets.mixkit.co/..."
                        />
                        <div className="text-center text-xs text-on-surface-variant mb-2">OR UPLOAD VIDEO (Max 50MB)</div>
                        <div className="border border-dashed border-outline-variant/50 rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                            disabled={uploadingVideo}
                            className="hidden"
                            id="videoUpload"
                          />
                          <label htmlFor="videoUpload" className={`cursor-pointer flex flex-col items-center ${uploadingVideo ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className="text-body-sm text-primary font-medium">Click to select video file</span>
                          </label>
                        </div>
                        {uploadingVideo && (
                           <div className="mt-3 flex items-center justify-center gap-2 text-sm text-primary">
                             <Loader2 className="w-4 h-4 animate-spin" /> Uploading Video... {Math.round(videoUploadProgress)}%
                           </div>
                        )}
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-label-md font-medium text-on-surface mb-2">
                            Today's 22K Gold Rate (per 10g)
                          </label>
                          <input
                            type="text"
                            className="w-full border-b border-outline bg-transparent py-2 text-on-surface focus:border-primary focus:outline-none transition-colors"
                            value={goldRate22k}
                            onChange={(e) => setGoldRate22k(e.target.value)}
                            placeholder="₹72,500"
                          />
                        </div>
                        <div>
                          <label className="block text-label-md font-medium text-on-surface mb-2">
                            Today's 24K Gold Rate (per 10g)
                          </label>
                          <input
                            type="text"
                            className="w-full border-b border-outline bg-transparent py-2 text-on-surface focus:border-primary focus:outline-none transition-colors"
                            value={goldRate24k}
                            onChange={(e) => setGoldRate24k(e.target.value)}
                            placeholder="₹77,400"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-label-md font-medium text-on-surface mb-2">
                            "For Him" Collections
                          </label>
                          <select
                            multiple
                            className="w-full border border-outline bg-transparent py-2 px-3 rounded-lg text-on-surface focus:border-primary focus:outline-none transition-colors h-32"
                            value={Array.isArray(forHimCollectionIds) ? forHimCollectionIds : []}
                            onChange={(e) => {
                              const options = Array.from(e.target.selectedOptions);
                              setForHimCollectionIds(options.map(o => o.value));
                            }}
                          >
                            {categories.map((c: any) => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                          </select>
                          <p className="text-xs text-on-surface-variant mt-1">Hold Ctrl/Cmd to select multiple. Order clicked matters.</p>
                        </div>
                        <div>
                          <label className="block text-label-md font-medium text-on-surface mb-2">
                            "For Her" Collections
                          </label>
                          <select
                            multiple
                            className="w-full border border-outline bg-transparent py-2 px-3 rounded-lg text-on-surface focus:border-primary focus:outline-none transition-colors h-32"
                            value={Array.isArray(forHerCollectionIds) ? forHerCollectionIds : []}
                            onChange={(e) => {
                              const options = Array.from(e.target.selectedOptions);
                              setForHerCollectionIds(options.map(o => o.value));
                            }}
                          >
                            {categories.map((c: any) => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                          </select>
                          <p className="text-xs text-on-surface-variant mt-1">Hold Ctrl/Cmd to select multiple. Order clicked matters.</p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors disabled:opacity-50 luxury-shadow hover:luxury-shadow-hover -translate-y-0.5 active:translate-y-0 active:luxury-shadow"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Saving...
                          </div>
                        ) : (
                          'Save Settings'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
