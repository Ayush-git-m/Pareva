export function optimizeImage(url: string, width?: number): string {
    if (!url) return url;
    
    // Check if it's a Google User Content image URL
    if (url.includes('lh3.googleusercontent.com') || url.includes('googleusercontent.com')) {
        // If it already has size parameters at the end (like =s0 or =w...-h...), replace them
        if (url.includes('=')) {
            const baseUrl = url.split('=')[0];
            return `${baseUrl}=w${width || 800}-rw-v1`;
        } else {
            return `${url}=w${width || 800}-rw-v1`;
        }
    }
    
    return url;
}
