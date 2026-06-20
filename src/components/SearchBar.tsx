import { useState, useEffect, useRef } from 'react';
import { Search, X, Gem, Layers } from 'lucide-react';
import { api } from '../lib/api';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState<any[]>([]);
  const [jewelries, setJewelries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (isOpen && collections.length === 0 && jewelries.length === 0) {
        setLoading(true);
        try {
          const [cols, jews] = await Promise.all([
            api.getCollections(),
            api.getJewelries()
          ]);
          setCollections(cols);
          setJewelries(jews);
        } catch (error) {
          console.error("Failed to fetch search data", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCollections = collections.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredJewelries = jewelries.filter(j => 
    j.title.toLowerCase().includes(query.toLowerCase()) || 
    (j.description && j.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div ref={searchRef} className="relative z-50">
      <div 
        className={`flex items-center transition-all duration-300 ${isOpen ? 'bg-surface-container w-full md:w-64 lg:w-80 px-3 py-2 rounded-full border border-luxury-gold/30' : 'bg-transparent w-auto'}`}
      >
        <button 
          onClick={() => setIsOpen(true)}
          className="text-primary hover:text-luxury-gold transition-colors p-2"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
        
        {isOpen && (
          <input
            type="text"
            className="bg-transparent border-none outline-none w-full text-body-md text-on-surface placeholder:text-on-surface-variant/50 ml-2"
            placeholder="Search products & collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        )}

        {isOpen && query && (
          <button 
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] md:w-[400px] bg-white rounded-xl luxury-shadow overflow-hidden max-h-[70vh] flex flex-col border border-outline-variant/30">
          {loading ? (
            <div className="p-8 text-center text-on-surface-variant text-body-md">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mb-2"></div>
              <p>Searching...</p>
            </div>
          ) : (
            <div className="overflow-y-auto w-full">
              {filteredCollections.length === 0 && filteredJewelries.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-body-md">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="py-2">
                  {/* Collections Results */}
                  {filteredCollections.length > 0 && (
                    <div className="mb-4">
                      <div className="px-4 py-2 text-label-sm uppercase tracking-wider text-luxury-gold bg-surface-container-low flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Collections
                      </div>
                      <div className="flex flex-col">
                        {filteredCollections.slice(0, 5).map(c => (
                          <Link 
                            key={`col-${c.id}`} 
                            to={`/collection/${c.id}`}
                            className="px-4 py-3 hover:bg-surface-container transition-colors flex items-center gap-3"
                            onClick={() => setIsOpen(false)}
                          >
                            <img src={c.imageUrl || "https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?auto=format&fit=crop&q=80&w=150"} alt={c.title} className="w-10 h-10 object-cover rounded-md" />
                            <div>
                              <div className="text-title-sm text-primary line-clamp-1">{c.title}</div>
                              <div className="text-body-sm text-on-surface-variant line-clamp-1">{c.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jewelries Results */}
                  {filteredJewelries.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-label-sm uppercase tracking-wider text-luxury-gold bg-surface-container-low flex items-center gap-2">
                        <Gem className="w-4 h-4" /> Products
                      </div>
                      <div className="flex flex-col">
                        {filteredJewelries.slice(0, 10).map(j => {
                          const col = collections.find(c => String(c.id) === String(j.collectionId));
                          return (
                            <Link 
                              key={`jew-${j.id}`} 
                              to={`/product/${j.id}`}
                              className="px-4 py-3 hover:bg-surface-container transition-colors flex items-center gap-3"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-md border border-outline-variant/30 px-1">
                                <img src={j.imageUrl || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=150"} alt={j.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="text-title-sm text-primary line-clamp-1">{j.title}</div>
                                <div className="text-body-sm text-on-surface-variant text-xs flex justify-between">
                                  <span className="truncate">{col ? col.title : 'Collection item'}</span>
                                  <span className="text-luxury-gold font-medium shrink-0 ml-2">{j.price ? `₹${j.price.toLocaleString()}` : ''}</span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
