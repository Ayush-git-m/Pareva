import { auth } from '../firebase';

const API = "https://api.shreeparevajewellers.com";


const getToken = async () => {
    if (!auth.currentUser) return '';
    return await auth.currentUser.getIdToken();
};

export const api = {
    getJewelries: async () => {
        try {
            const res = await fetch(`${API}/api/jewelries`);
            if (!res.ok) return [];
            return await res.json();
        } catch {
            return [];
        }
    },

    getCollections: async () => {
        try {
            const res = await fetch(`${API}/api/collections`);
            if (!res.ok) return [];
            return await res.json();
        } catch {
            return [];
        }
    },

    getBanners: async () => {
        try {
            const res = await fetch(`${API}/api/hero-banners`);
            if (!res.ok) return [];
            return await res.json();
        } catch {
            return [];
        }
    },

    addCollection: async (data: any) => {
        const res = await fetch(`${API}/api/collections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },

    addJewellery: async (data: any) => {
        const res = await fetch(`${API}/api/jewelries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },

    addBanner: async (data: any) => {
        const res = await fetch(`${API}/api/hero-banners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to add');
        return res.json();
    },

    deleteItem: async (type: string, id: number) => {
        const endpoint =
            type === 'jewellery'
                ? 'jewelries'
                : type === 'category'
                ? 'collections'
                : 'hero-banners';

        const res = await fetch(`${API}/api/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        if (!res.ok) throw new Error('Failed to delete');
        return res.json();
    },

    updateJewellery: async (id: string, data: any) => {
        const res = await fetch(`${API}/api/jewelries/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Failed to update jewellery');
        return res.json();
    },

    updateCollection: async (id: string, data: any) => {
        const res = await fetch(`${API}/api/collections/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Failed to update category');
        return res.json();
    },

    toggleBanner: async (id: number, enabled: boolean) => {
        const res = await fetch(`${API}/api/hero-banners/${id}/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify({ enabled })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to toggle banner');

        return data;
    },

    reorderBanners: async (items: any[]) => {
        const res = await fetch(`${API}/api/hero-banners/reorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify({ items })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to reorder');

        return data;
    },

    getSettings: async () => {
        try {
            const res = await fetch(`${API}/api/settings`);
            if (!res.ok) return {};
            return await res.json();
        } catch {
            return {};
        }
    },

    updateSettings: async (settings: Record<string, string>) => {
        const res = await fetch(`${API}/api/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify({ settings })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to update settings');

        return data;
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
