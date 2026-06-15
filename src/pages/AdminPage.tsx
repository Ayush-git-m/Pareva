import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { collectionsData } from '../data/collections';
import { Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jewelries, setJewelries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'jewelries' | 'categories'>('jewelries');
  
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Jewelry State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [price, setPrice] = useState('');
  
  // Category State
  const [catTitle, setCatTitle] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImagePreview, setCatImagePreview] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
    setLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const qJ = query(collection(db, 'jewelries'));
      const querySnapshotJ = await getDocs(qJ);
      const jData = querySnapshotJ.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      jData.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setJewelries(jData);
      
      const qC = query(collection(db, 'collections'));
      const querySnapshotC = await getDocs(qC);
      const catData = querySnapshotC.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      catData.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      const allCategories = [...catData, ...collectionsData];
      setCategories(allCategories);
      
      if (allCategories.length > 0 && !collectionId) {
         setCollectionId(allCategories[0].id);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch data.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === 'Shree Pareva' && adminPassword === 'ShreePareva@123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
      fetchData();
    } else {
      setError('Invalid ID or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setAdminId('');
    setAdminPassword('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddJewelry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imagePreview) {
      setError('Please fill in all required fields and upload an image.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const newJewelry: any = {
        title,
        description,
        collectionId,
        imageUrl: imagePreview,
        createdAt: serverTimestamp(),
      };
      if (price) {
        newJewelry.price = Number(price);
      }

      await addDoc(collection(db, 'jewelries'), newJewelry);
      
      setTitle('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setImagePreview('');
      
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error adding jewelry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCatImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCatImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle || !catDescription || !catImagePreview) {
      setError('Please fill in all required fields and upload an image.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const newCategory: any = {
        title: catTitle,
        description: catDescription,
        imageUrl: catImagePreview,
        createdAt: serverTimestamp(),
      };

      const docId = catTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Warning: if document exists, setDoc overwrites it. To be safe, let's just use addDoc or doc.
      // addDoc creates a random ID. The original sets used natural ids like 'gold-jewellery'. 
      // We will just let firestore generate random IDs so we never overwrite by accident.
      await addDoc(collection(db, 'collections'), newCategory);
      
      setCatTitle('');
      setCatDescription('');
      setCatImagePreview('');
      
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error adding category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJ = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this jewelry?')) return;
    try {
      await deleteDoc(doc(db, 'jewelries', id));
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error deleting jewelry');
    }
  };

  const handleDeleteC = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category? All related jewelries will become orphaned.')) return;
    try {
      await deleteDoc(doc(db, 'collections', id));
      await fetchData();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error deleting category');
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
      <Header />
      <div className="flex-1 max-w-container-max mx-auto px-gutter py-12 w-full">
        {!isAuthenticated ? (
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl luxury-shadow">
            <h1 className="text-headline-md text-primary mb-6 font-headline-md">Admin Login</h1>
            {error && <p className="text-error mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant/50 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-display-sm text-primary font-display-sm">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-primary hover:underline"
              >
                Sign Out
              </button>
            </div>
            
            {error && <div className="bg-error/10 text-error p-4 rounded-lg mb-8">{error}</div>}

            <div className="flex space-x-4 mb-8 border-b border-outline-variant/30">
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors ${activeTab === 'jewelries' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('jewelries')}
              >
                Jewelries
              </button>
              <button
                className={`pb-4 px-2 font-medium text-label-lg transition-colors ${activeTab === 'categories' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('categories')}
              >
                Categories
              </button>
            </div>

            {activeTab === 'jewelries' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-2xl luxury-shadow sticky top-24">
                    <h2 className="text-title-lg text-primary mb-6">Add New Jewelry</h2>
                    <form onSubmit={handleAddJewelry} className="space-y-4">
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
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Photo (Max 1MB)</label>
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
                            <span className="text-body-sm text-primary">Click to select image</span>
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        Add Jewelry
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
                        <label className="block text-body-sm font-medium text-on-surface mb-1">Cover Image (Max 1MB)</label>
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
                            <span className="text-body-sm text-primary">Click to select image</span>
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-full hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-2 mt-6"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        Add Category
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
                            <button
                              onClick={() => handleDeleteC(cat.id)}
                              className="absolute top-2 right-2 bg-white/90 text-error hover:bg-error/10 p-2 rounded-full transition-colors luxury-shadow"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
