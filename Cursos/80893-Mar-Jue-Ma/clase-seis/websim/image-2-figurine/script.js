class FigurineGenerator {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.optionsSection = document.getElementById('optionsSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.backgroundSelect = document.getElementById('backgroundSelect');
        this.poseAdjust = document.getElementById('poseAdjust');
        this.generateBtn = document.getElementById('generateBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.newImageBtn = document.getElementById('newImageBtn');
        this.originalImage = document.getElementById('originalImage');
        this.figurineImage = document.getElementById('figurineImage');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.customStyle = document.getElementById('customStyle');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.currentImageFile = null;
        this.currentImageDataUrl = null;
        
        this.initEventListeners();
        this.initDarkMode();
    }
    
    initEventListeners() {
        // Upload area events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // File input change
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Button events
        this.generateBtn.addEventListener('click', this.generateFigurine.bind(this));
        this.downloadBtn.addEventListener('click', this.downloadFigurine.bind(this));
        this.newImageBtn.addEventListener('click', this.resetUpload.bind(this));
        
        // Dark mode toggle
        this.darkModeToggle.addEventListener('click', this.toggleDarkMode.bind(this));
        
        // Background select change
        this.backgroundSelect.addEventListener('change', this.handleBackgroundChange.bind(this));
    }
    
    initDarkMode() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateDarkModeIcon(savedTheme);
    }
    
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateDarkModeIcon(newTheme);
    }
    
    updateDarkModeIcon(theme) {
        this.darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    handleBackgroundChange() {
        const isCustom = this.backgroundSelect.value === 'custom';
        this.customStyle.style.display = isCustom ? 'block' : 'none';
        this.customStyle.required = isCustom;
    }
    
    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            this.processFile(files[0]);
        }
    }
    
    handleFileSelect(e) {
        if (e.target.files.length > 0) {
            this.processFile(e.target.files[0]);
        }
    }
    
    processFile(file) {
        this.currentImageFile = file;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageDataUrl = e.target.result;
            this.originalImage.src = this.currentImageDataUrl;
            this.showOptions();
        };
        reader.readAsDataURL(file);
    }
    
    showOptions() {
        this.optionsSection.style.display = 'block';
        this.optionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    async generateFigurine() {
        if (!this.currentImageDataUrl) return;
        
        this.showResults();
        this.showLoading();
        this.hideError();
        
        try {
            const backgroundType = this.backgroundSelect.value;
            const customStyle = this.customStyle.value.trim();
            const allowPoseAdjust = this.poseAdjust.checked;
            
            const prompt = this.buildPrompt(backgroundType, allowPoseAdjust, customStyle);
            
            const result = await websim.imageGen({
                prompt: prompt,
                image_inputs: [{
                    url: this.currentImageDataUrl
                }],
                aspect_ratio: "4:5"
            });
            
            this.figurineImage.src = result.url;
            this.hideLoading();
            
        } catch (error) {
            console.error('Error generating figurine:', error);
            this.hideLoading();
            
            // Check if it's likely a rate limit error
            if (error.message && (error.message.includes('limit') || error.message.includes('quota') || error.message.includes('rate'))) {
                this.showError();
            } else {
                alert('Failed to generate figurine. Please try again.');
            }
        }
    }
    
    buildPrompt(backgroundType, allowPoseAdjust, customStyle) {
        const backgroundDescriptions = {
            'desk': 'wooden desk with books and stationery',
            'bookshelf': 'bookshelf filled with books and collectibles',
            'rock': 'natural rock formation or stone surface',
            'display': 'glass display cabinet with soft lighting',
            'shelf': 'simple wooden shelf with neutral background',
            'custom': customStyle || 'simple neutral background'
        };
        
        const poseText = allowPoseAdjust ? 
            ', slightly adjusting the pose if needed for better figurine display' : 
            ', keeping the exact same pose';
        
        const backgroundDesc = backgroundType === 'custom' && customStyle ? 
            customStyle : 
            `placed on a ${backgroundDescriptions[backgroundType]}`;
        
        return `Transform this character into a realistic 1/7 scale PVC figurine. The figurine should be ${backgroundDesc}. Key requirements:
        - Maintain complete fidelity to the character's design, colors, and details
        - Convert to PVC/plastic material with visible figurine texture and slight glossy finish
        - Add a circular black base underneath the character
        - Professional figurine photography lighting
        - High quality collectible figurine appearance
        - Keep all character features, clothing, and accessories identical${poseText}
        - Photorealistic figurine render with proper shadows and reflections`;
    }
    
    showResults() {
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    showLoading() {
        this.loadingSpinner.style.display = 'block';
        this.figurineImage.style.opacity = '0.3';
    }
    
    hideLoading() {
        this.loadingSpinner.style.display = 'none';
        this.figurineImage.style.opacity = '1';
    }
    
    showError() {
        this.errorMessage.style.display = 'block';
        this.figurineImage.style.opacity = '0.3';
    }
    
    hideError() {
        this.errorMessage.style.display = 'none';
    }
    
    downloadFigurine() {
        if (this.figurineImage.src) {
            const link = document.createElement('a');
            link.download = 'character-figurine.png';
            link.href = this.figurineImage.src;
            link.click();
        }
    }
    
    resetUpload() {
        this.currentImageFile = null;
        this.currentImageDataUrl = null;
        this.fileInput.value = '';
        this.customStyle.value = '';
        this.optionsSection.style.display = 'none';
        this.resultsSection.style.display = 'none';
        this.figurineImage.src = '';
        this.originalImage.src = '';
        this.hideError();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FigurineGenerator();
});