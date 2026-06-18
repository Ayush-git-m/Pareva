import { auth } from '../firebase';

const getToken = async () => {
    if (!auth.currentUser) return '';
    return await auth.currentUser.getIdToken();
};

export const api = {
    getJewelries: async () => {
        try {
            const res = await fetch('/api/jewelries');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            return [];
        }
    },
    getCollections: async () => {
        try {
            const res = await fetch('/api/collections');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            return [];
        }
    },
    getBanners: async () => {
        try {
            const res = await fetch('/api/hero-banners');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            return [];
        }
    },
    addCollection: async (data: any) => {
        const res = await fetch('/api/collections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },
    addJewellery: async (data: any) => {
        const res = await fetch('/api/jewelries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },
    addBanner: async (data: any) => {
        const res = await fetch('/api/hero-banners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },
    deleteItem: async (type: string, id: number) => {
        const endpoint = type === 'jewellery' ? 'jewelries' : type === 'category' ? 'collections' : 'hero-banners';
        const res = await fetch(`/api/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${await getToken()}` }
        });
        if (!res.ok) throw new Error('Failed to delete');
        return res.json();
    },
    toggleBanner: async (id: number, enabled: boolean) => {
         const res = await fetch(`/api/hero-banners/${id}/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
            body: JSON.stringify({ enabled })
         });
         return res.json();
    },
    reorderBanners: async (items: any[]) => {
         const res = await fetch(`/api/hero-banners/reorder`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
             body: JSON.stringify({ items })
         });
         return res.json();
    },
    getSettings: async () => {
        try {
            const res = await fetch('/api/settings');
            if (!res.ok) return {};
            return await res.json();
        } catch (err) {
            console.warn("Failed to fetch settings from server, using defaults");
            return {};
        }
    },
    updateSettings: async (settings: Record<string, string>) => {
         const res = await fetch(`/api/settings`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getToken()}` },
             body: JSON.stringify({ settings })
         });
         return res.json();
    }
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
