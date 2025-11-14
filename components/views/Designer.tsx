import React from 'react';
import { AppState, User, DesignStyle } from '../../types';
import { DESIGN_STYLES } from '../../constants';
import { UploadIcon, MagicWandIcon, RefreshIcon, SaveIcon } from '../icons';
import Loader from '../Loader';
import BeforeAfterSlider from '../BeforeAfterSlider';


interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  setIsLoading: (loading: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, setIsLoading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-teal-500', 'bg-teal-50', 'dark:bg-teal-900/20');
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setIsLoading(true);
      onImageUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white animate-fade-in-up" style={{ animationDelay: '100ms'}}>Redesign Your Space in Seconds</h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '200ms'}}>Upload a photo of your room and watch AI bring new design ideas to life.</p>
      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '300ms'}}>
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer group flex justify-center w-full px-6 pt-10 pb-12 border-2 border-gray-300 border-dashed rounded-lg transition hover:border-teal-400 dark:border-gray-600 dark:hover:border-teal-500"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-teal-500 transition"/>
            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-teal-600 dark:text-teal-400">Upload a file</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

interface StyleSelectorProps {
  selectedStyle: DesignStyle | null;
  onSelectStyle: (style: DesignStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">2. Choose a Style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {DESIGN_STYLES.map((style) => (
                <div key={style.id} onClick={() => onSelectStyle(style)} className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${selectedStyle?.id === style.id ? 'border-teal-500 ring-2 ring-teal-500' : 'border-transparent hover:border-teal-400'}`}>
                    <img src={style.imageUrl} alt={style.name} className="h-24 w-full object-cover"/>
                    <div className="p-2 text-center bg-white dark:bg-gray-800">
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{style.name}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

interface ResultsDisplayProps {
    originalImage: string;
    generatedImages: string[];
    onReset: () => void;
    onSaveToGallery: (generatedImage: string) => void;
    user: User | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ originalImage, generatedImages, onReset, onSaveToGallery, user }) => (
    <div className="w-full animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your New Room!</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Drag the slider on each image to see the before and after.</p>
            </div>
            <button onClick={onReset} className="flex-shrink-0 flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition">
                <RefreshIcon className="w-5 h-5"/>
                <span>Start Over</span>
            </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {generatedImages.map((imgSrc, index) => (
                <div key={index} className="relative group">
                    <BeforeAfterSlider before={originalImage} after={imgSrc} index={index} />
                    {user && user.plan !== 'Free' && (
                        <button
                            onClick={() => onSaveToGallery(imgSrc)}
                            title="Save to Gallery"
                            className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2 backdrop-blur-sm hover:bg-teal-500 z-10"
                        >
                            <SaveIcon className="w-5 h-5" />
                        </button>
                    )}
                    {user && user.plan === 'Free' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-10">
                            <span className="text-white text-sm font-bold text-center px-4">Upgrade to Pro to save designs</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

interface DesignerProps {
    appState: AppState;
    user: User | null;
    uploadedImageUrl: string | null;
    selectedStyle: DesignStyle | null;
    customPrompt: string;
    generatedImages: string[];
    loadingMessage: string;
    isLoading: boolean;
    error: string | null;
    onImageUpload: (file: File) => void;
    onSelectStyle: (style: DesignStyle) => void;
    setCustomPrompt: (prompt: string) => void;
    onGenerate: () => void;
    onReset: () => void;
    onSaveToGallery: (image: string) => void;
    setIsLoading: (loading: boolean) => void;
}

const Designer: React.FC<DesignerProps> = (props) => {
    
    const renderContent = () => {
        switch (props.appState) {
            case 'UPLOADING':
                return <ImageUploader onImageUpload={props.onImageUpload} setIsLoading={props.setIsLoading}/>;
            case 'CUSTOMIZING':
                if (!props.uploadedImageUrl) return null;
                return (
                    <div className="w-full max-w-4xl space-y-8 animate-fade-in">
                         {props.user?.plan === 'Free' && (
                            <div className="text-center p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-lg">
                                <p className="font-semibold text-teal-800 dark:text-teal-200">You have {props.user.freeGenerationsLeft} free generations left.</p>
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">1. Your Room</h3>
                            <img src={props.uploadedImageUrl} alt="Uploaded room" className="mt-4 rounded-lg shadow-md w-full max-h-96 object-contain"/>
                        </div>
                        <StyleSelector selectedStyle={props.selectedStyle} onSelectStyle={props.onSelectStyle} />
                         <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3. Add Extra Details (Optional)</h3>
                            <textarea
                                value={props.customPrompt}
                                onChange={(e) => props.setCustomPrompt(e.target.value)}
                                placeholder="e.g., 'add a large green plant in the corner', 'make the walls light blue', 'use wooden furniture'..."
                                className="mt-2 w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 transition text-gray-900 dark:text-gray-200"
                                rows={3}
                            />
                        </div>
                        <div className="text-center pt-4">
                            <button
                                onClick={props.onGenerate}
                                disabled={!props.selectedStyle}
                                className="inline-flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <MagicWandIcon className="w-6 h-6"/>
                                <span className="text-lg">Generate Designs</span>
                            </button>
                        </div>
                    </div>
                );
            case 'GENERATING':
                return <Loader message={props.loadingMessage} />;
            case 'RESULTS':
                if (!props.uploadedImageUrl) return null;
                return <ResultsDisplay originalImage={props.uploadedImageUrl} generatedImages={props.generatedImages} onReset={props.onReset} onSaveToGallery={props.onSaveToGallery} user={props.user} />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-[70vh] p-4 md:p-8 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl transition-all duration-500 ${props.appState === 'GENERATING' ? 'bg-transparent dark:bg-transparent shadow-none backdrop-blur-none' : ''}`}>
            {props.isLoading && props.appState === 'UPLOADING' && <Loader message="Processing your image..." />}
            {!props.isLoading && props.error && (
                <div className="mb-4 w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{props.error}</span>
                </div>
            )}
            {!props.isLoading && renderContent()}
        </div>
    )
};

export default Designer;
