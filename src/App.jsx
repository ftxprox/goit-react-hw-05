import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import { fetchImages } from './components/api';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const lastImageRef = useRef(null);

  const getImages = useCallback(async () => {
    try {
      setLoading(true);
      const { images: newImages, totalPages } = await fetchImages(query, page);

      if (newImages.length === 0) {
        toast.error("No results found for your search.");
      }

      setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
      setTotalPages(totalPages);

      if (page >= totalPages && newImages.length > 0) {
        toast.success('You have reached the end of the results.');
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) getImages();
  }, [query, page, getImages]);

  const uniqueImages = useMemo(() => {
    const seen = new Set();
    return images.filter((image) => {
      if (seen.has(image.id)) return false;
      seen.add(image.id);
      return true;
    });
  }, [images]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalPages(1);
    setError(null);
  };

  const handleLoadMore = () => setPage((prevPage) => prevPage + 1);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [images]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />

      {loading && <Loader />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={uniqueImages} onImageClick={handleImageClick} lastImageRef={lastImageRef} />
          {uniqueImages.length > 0 && page < totalPages && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          largeImageURL={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
        />
      )}
    </>
  );
};

export default App;