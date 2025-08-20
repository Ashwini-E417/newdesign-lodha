//sticky header JS
    function resizeHeader() {
        const header = document.querySelector('header');
    if (window.innerWidth > 768) {
let lastScroll = 0;

const bannerHeight = document.querySelector('.bannerContainer').offsetHeight;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= bannerHeight) {
        // We are still in or near the banner area
        if (currentScroll <= 50) {
            // At very top → always show
            header.classList.remove('hide');
        } 
        else if (currentScroll > lastScroll) {
            // Scrolling down in banner area → hide
            header.classList.add('hide');
        } 
        else {
            // Scrolling up in banner area → show
            header.classList.remove('hide');
        }
    } 
    else {
        // Beyond banner → always hide first navbar
        header.classList.add('hide');
    }

    lastScroll = currentScroll;
});
    }
    else {
        header.classList.remove("hide");
    }
}
window.addEventListener("resize",(e)=>{
    e.preventDefault();
    resizeHeader();
})
window.addEventListener("load",(e)=>{
    e.preventDefault();
    resizeHeader();
})


//Overview and menubar JS
    document.querySelectorAll(".readMoreLink").forEach((element,index)=>{
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelectorAll(".clamptext")[index].classList.toggle("clamptext-block");
            element.innerHTML = (element.innerHTML === "Read Less") ? "Read More" : "Read Less" ;
        });
    });

            document.getElementById("burgerMenu").addEventListener("click", function () {
                document.body.classList.toggle("mobMenuOpen");
                document.querySelector(".sidebar").classList.toggle("sidebaractive");
            });

            window.addEventListener("load",(e)=>{
                e.preventDefault();
                document.querySelector(".sidebar").style.top = document.querySelector("header").clientHeight+"px"
            })


            //Amenities JS
        class AmenitiesCarousel {
            constructor() {
                // Get the original slides
                this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
                this.amenitiesTotalSlides = this.originalSlides.length;
                
                // Store data for lightbox
                this.amenitiesImages = [];
                this.amenitiesTexts = [];
                
                // Extract data from original slides
                this.originalSlides.forEach(slide => {
                    const img = slide.querySelector('.amenities-image');
                    const text = slide.querySelector('.amenities-text-overlay');
                    this.amenitiesImages.push(img.src);
                    this.amenitiesTexts.push(text.textContent);
                    
                    // Add error handling for images
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                    };
                });
                
                // Setup carousel variables
                this.amenitiesCurrentIndex = 0;
                this.amenitiesTrack = document.getElementById('amenitiesTrack');
                // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
                this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
                this.amenitiesNextBtn = document.getElementById('amenitiesNext');
                this.amenitiesAutoPlayInterval = null;
                this.amenitiesIsTransitioning = false;
                
                // Calculate starting position for seamless infinite scroll
                this.amenitiesPosition = this.amenitiesTotalSlides;
                
                // Lightbox elements
                this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
                this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
                this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
                this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
                this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
                this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
                this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
                this.amenitiesLightboxCurrentIndex = 0;
                
                // Initialize the carousel
                this.amenitiesInit();
            }
            
            amenitiesInit() {
                // Clone slides for infinite effect
                this.amenitiesCloneSlides();
                
                // Create dots
                // this.amenitiesCreateDots();
                
                // Bind events
                this.amenitiesBindEvents();
                this.amenitiesBindLightboxEvents();
                
                // Position the carousel
                this.amenitiesUpdateCarousel();
                
                // Start autoplay
                this.amenitiesStartAutoPlay();
            }
            
            amenitiesCloneSlides() {
                // Create clones for infinite scrolling effect
                const fragmentStart = document.createDocumentFragment();
                const fragmentEnd = document.createDocumentFragment();
                
                // Clone first 3 slides to the end
                for (let i = 0; i < 3; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentEnd.appendChild(clone);
                }
                
                // Clone last 3 slides to the beginning
                for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentStart.appendChild(clone);
                }
                
                // Append clones to track
                this.amenitiesTrack.prepend(fragmentStart);
                this.amenitiesTrack.appendChild(fragmentEnd);
                
                // Setup image click events for all slides
                this.amenitiesSetupImageClickEvents();
            }
            
            amenitiesSetupImageClickEvents() {
                const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                slides.forEach((slide, index) => {
                    const img = slide.querySelector('.amenities-image');
                    img.addEventListener('click', () => {
                        // Calculate original image index
                        const totalSlides = slides.length;
                        const originalIndex = (index - 3 + totalSlides) % this.amenitiesTotalSlides;
                        this.openAmenitiesLightbox(originalIndex);
                    });
                });
            }
            
            // amenitiesCreateDots() {
            //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
            //         const amenitiesDot = document.createElement('button');
            //         amenitiesDot.className = 'amenities-dot';
            //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
            //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
            //     }
            // }
            
            amenitiesBindEvents() {
                this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
                this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());
                
                // Touch events for mobile
                let amenitiesStartX = 0;
                let amenitiesEndX = 0;
                
                this.amenitiesTrack.addEventListener('touchstart', (e) => {
                    amenitiesStartX = e.touches[0].clientX;
                },{passive:true});
                
                this.amenitiesTrack.addEventListener('touchend', (e) => {
                    amenitiesEndX = e.changedTouches[0].clientX;
                    const amenitiesDiff = amenitiesStartX - amenitiesEndX;
                    
                    if (Math.abs(amenitiesDiff) > 50) {
                        if (amenitiesDiff > 0) {
                            this.amenitiesNextSlide();
                        } else {
                            this.amenitiesPrevSlide();
                        }
                    }
                },{passive:true});
                
                // Pause autoplay on hover
                this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
                this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.amenitiesPrevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.amenitiesNextSlide();
                    } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                        this.closeAmenitiesLightbox();
                    }
                });
            }
            
            amenitiesBindLightboxEvents() {
                // Close lightbox events
                this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
                this.amenitiesLightbox.addEventListener('click', (e) => {
                    if (e.target === this.amenitiesLightbox) {
                        this.closeAmenitiesLightbox();
                    }
                });
                
                // Lightbox navigation
                this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
                this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
            }
            
            openAmenitiesLightbox(index) {
                this.amenitiesLightboxCurrentIndex = index;
                this.amenitiesLightboxImage.src = this.amenitiesImages[index];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
                this.updateAmenitiesLightboxCounter();
                this.amenitiesLightbox.classList.add('active');
                this.amenitiesStopAutoPlay();
                document.body.style.overflow = 'hidden';
            }
            
            closeAmenitiesLightbox() {
                this.amenitiesLightbox.classList.remove('active');
                this.amenitiesStartAutoPlay();
                document.body.style.overflow = 'auto';
            }
            
            amenitiesLightboxPrevImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            amenitiesLightboxNextImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            updateAmenitiesLightboxCounter() {
                this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
            }
            
            amenitiesUpdateCarousel() {
                const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');
                
                // Calculate which slide is in the center
                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesCenterIndex = amenitiesIsMobile ? 
                    this.amenitiesPosition + 1 : 
                    this.amenitiesPosition + 1;
                
                // Update center slide highlighting
                // amenitiesSlides.forEach((slide, index) => {
                //     slide.classList.remove('amenities-center');
                //     if (index === amenitiesCenterIndex) {
                //         slide.classList.add('amenities-center');
                //     }
                // });
                
                // Update active dot
                // amenitiesDots.forEach((dot, index) => {
                //     dot.classList.remove('amenities-active');
                //     if (index === this.amenitiesCurrentIndex) {
                //         dot.classList.add('amenities-active');
                //     }
                // });
                
                // Move carousel
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
                this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
            }
            
            amenitiesNextSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition++;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                    if (this.amenitiesPosition >= totalSlides - 3) {
                        this.amenitiesTrack.style.transition = 'none';
                        this.amenitiesPosition = 3;
                        
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        
                        // amenitiesSlides[index].classList.add("amenities-center");
                        
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesPrevSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition--;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    if (this.amenitiesPosition <= 0) {
                        this.amenitiesTrack.style.transition = 'none';
                        const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                        this.amenitiesPosition = totalSlides - 6;
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesGoToSlide(index) {
                if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;
                
                this.amenitiesIsTransitioning = true;
                
                // Calculate the difference
                const diff = index - this.amenitiesCurrentIndex;
                this.amenitiesPosition += diff;
                this.amenitiesCurrentIndex = index;
                
                this.amenitiesUpdateCarousel();
                
                setTimeout(() => {
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesStartAutoPlay() {
                this.amenitiesStopAutoPlay();
                this.amenitiesAutoPlayInterval = setInterval(() => {
                    this.amenitiesNextSlide();
                }, 5000);
            }
            
            amenitiesStopAutoPlay() {
                if (this.amenitiesAutoPlayInterval) {
                    clearInterval(this.amenitiesAutoPlayInterval);
                    this.amenitiesAutoPlayInterval = null;
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new AmenitiesCarousel();
        });










        // Floor Js
        class floorCarousel {
            constructor() {
                // Get the original slides
                this.originalSlides = Array.from(document.querySelectorAll('.floor-slide'));
                this.floorTotalSlides = this.originalSlides.length;
                
                // Store data for lightbox
                this.floorImages = [];
                this.floorTexts = [];
                
                // Extract data from original slides
                this.originalSlides.forEach(slide => {
                    const img = slide.querySelector('.floor-image');
                    const text = slide.querySelector('.floor-text-overlay');
                    this.floorImages.push(img.src);
                    this.floorTexts.push(text.textContent);
                    
                    // Add error handling for images
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                    };
                });
                
                // Setup carousel variables
                this.floorCurrentIndex = 0;
                this.floorTrack = document.getElementById('floorTrack');
                // this.floorDotsContainer = document.getElementById('floorDots');
                this.floorPrevBtn = document.getElementById('floorPrev');
                this.floorNextBtn = document.getElementById('floorNext');
                this.floorAutoPlayInterval = null;
                this.floorIsTransitioning = false;
                
                // Calculate starting position for seamless infinite scroll
                this.floorPosition = this.floorTotalSlides;
                
                
                
                // Initialize the carousel
                this.floorInit();
            }
            
            floorInit() {
                // Clone slides for infinite effect
                this.floorCloneSlides();
                
                // Create dots
                // this.floorCreateDots();
                
                // Bind events
                this.floorBindEvents();
                // this.floorBindLightboxEvents();
                
                // Position the carousel
                this.floorUpdateCarousel();
                
                // Start autoplay
                this.floorStartAutoPlay();
            }
            
            floorCloneSlides() {
                // Create clones for infinite scrolling effect
                const fragmentStart = document.createDocumentFragment();
                const fragmentEnd = document.createDocumentFragment();
                
                // Clone first 3 slides to the end
                for (let i = 0; i < 3; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentEnd.appendChild(clone);
                }
                
                // Clone last 3 slides to the beginning
                for (let i = this.floorTotalSlides - 3; i < this.floorTotalSlides; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentStart.appendChild(clone);
                }
                
                // Append clones to track
                this.floorTrack.prepend(fragmentStart);
                this.floorTrack.appendChild(fragmentEnd);
                
                // Setup image click events for all slides
                // this.floorSetupImageClickEvents();
            }
            
            
            
            
            
            floorBindEvents() {
                this.floorPrevBtn.addEventListener('click', () => this.floorPrevSlide());
                this.floorNextBtn.addEventListener('click', () => this.floorNextSlide());
                
                // Touch events for mobile
                let floorStartX = 0;
                let floorEndX = 0;
                
                this.floorTrack.addEventListener('touchstart', (e) => {
                    floorStartX = e.touches[0].clientX;
                },{passive:true});
                
                this.floorTrack.addEventListener('touchend', (e) => {
                    floorEndX = e.changedTouches[0].clientX;
                    const floorDiff = floorStartX - floorEndX;
                    
                    if (Math.abs(floorDiff) > 50) {
                        if (floorDiff > 0) {
                            this.floorNextSlide();
                        } else {
                            this.floorPrevSlide();
                        }
                    }
                },{passive:true});
                
                // Pause autoplay on hover
                this.floorTrack.addEventListener('mouseenter', () => this.floorStopAutoPlay());
                this.floorTrack.addEventListener('mouseleave', () => this.floorStartAutoPlay());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.floorPrevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.floorNextSlide();
                    } 
                    // else if (e.key === 'Escape' && this.floorLightbox.classList.contains('active')) {
                    //     this.closefloorLightbox();
                    // }
                });
            }
            
            
            floorUpdateCarousel() {
                const floorSlides = this.floorTrack.querySelectorAll('.floor-slide');
                // const floorDots = this.floorDotsContainer.querySelectorAll('.floor-dot');
                
                // Calculate which slide is in the center
                const floorIsMobile = window.innerWidth <= 576;
                const floorCenterIndex = floorIsMobile ? 
                    this.floorPosition + 1 : 
                    this.floorPosition + 1;
                
                
                
                // Move carousel
                const floorSlideWidth = floorIsMobile ? 100 : 33.333;
                const floorTranslateX = -(this.floorPosition * floorSlideWidth);
                this.floorTrack.style.transform = `translateX(${floorTranslateX}%)`;
                
            }
            
            floorNextSlide() {
                if (this.floorIsTransitioning) return;
                this.floorIsTransitioning = true;
                
                this.floorPosition++;
                this.floorCurrentIndex = (this.floorCurrentIndex + 1) % this.floorTotalSlides;
                
                this.floorUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    const totalSlides = this.floorTrack.querySelectorAll('.floor-slide').length;
                    if (this.floorPosition >= totalSlides - 3) {
                        this.floorTrack.style.transition = 'none';
                        this.floorPosition = 3;
                        
                        const floorIsMobile = window.innerWidth <= 576;
                        const floorSlideWidth = floorIsMobile ? 100 : 33.333;
                        this.floorTrack.style.transform = `translateX(-${this.floorPosition * floorSlideWidth}%)`;
                        
                        // floorSlides[index].classList.add("floor-center");
                        
                        setTimeout(() => {
                            this.floorTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            
                        }, 50);
                    }
                    this.floorIsTransitioning = false;
                }, 600);
            }
            
            floorPrevSlide() {
                if (this.floorIsTransitioning) return;
                this.floorIsTransitioning = true;
                
                this.floorPosition--;
                this.floorCurrentIndex = (this.floorCurrentIndex - 1 + this.floorTotalSlides) % this.floorTotalSlides;
                
                this.floorUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    if (this.floorPosition <= 0) {
                        this.floorTrack.style.transition = 'none';
                        const totalSlides = this.floorTrack.querySelectorAll('.floor-slide').length;
                        this.floorPosition = totalSlides - 6;
                        const floorIsMobile = window.innerWidth <= 576;
                        const floorSlideWidth = floorIsMobile ? 100 : 33.333;
                        this.floorTrack.style.transform = `translateX(-${this.floorPosition * floorSlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.floorTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.floorIsTransitioning = false;
                }, 600);
            }
            
            floorGoToSlide(index) {
                if (this.floorIsTransitioning || index === this.floorCurrentIndex) return;
                
                this.floorIsTransitioning = true;
                
                // Calculate the difference
                const diff = index - this.floorCurrentIndex;
                this.floorPosition += diff;
                this.floorCurrentIndex = index;
                
                this.floorUpdateCarousel();
                
                setTimeout(() => {
                    this.floorIsTransitioning = false;
                }, 600);
            }
            
            floorStartAutoPlay() {
                this.floorStopAutoPlay();
                this.floorAutoPlayInterval = setInterval(() => {
                    this.floorNextSlide();
                }, 5000);
            }
            
            floorStopAutoPlay() {
                if (this.floorAutoPlayInterval) {
                    clearInterval(this.floorAutoPlayInterval);
                    this.floorAutoPlayInterval = null;
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new floorCarousel();
        });

        let priceLink = document.querySelector(".price-MoreLink");
        priceLink.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(".price-clampContainer").classList.toggle("price-clampContainer-visible");
            priceLink.innerHTML = priceLink.innerHTML === "View More" ? "View Less" : "View More";
        })


        /* Gallery JS */
        class GalleryCarousel {
            constructor() {
                // Get the original slides
                this.originalSlides = Array.from(document.querySelectorAll('.gallery-slide'));
                this.galleryTotalSlides = this.originalSlides.length;
                
                // Store data for lightbox
                this.galleryImages = [];
                // this.galleryTexts = [];
                
                // Extract data from original slides
                this.originalSlides.forEach(slide => {
                    const img = slide.querySelector('.gallery-image');
                    // const text = slide.querySelector('.gallery-text-overlay');
                    this.galleryImages.push(img.src);
                    // this.galleryTexts.push(text.textContent);
                    
                    // Add error handling for images
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                    };
                });
                
                // Setup carousel variables
                this.galleryCurrentIndex = 0;
                this.galleryTrack = document.getElementById('galleryTrack');
                // this.galleryDotsContainer = document.getElementById('galleryDots');
                this.galleryPrevBtn = document.getElementById('galleryPrev');
                this.galleryNextBtn = document.getElementById('galleryNext');
                this.galleryAutoPlayInterval = null;
                this.galleryIsTransitioning = false;
                
                // Calculate starting position for seamless infinite scroll
                this.galleryPosition = this.galleryTotalSlides;
                
                // Lightbox elements
                this.galleryLightbox = document.getElementById('galleryLightbox');
                this.galleryLightboxImage = document.getElementById('galleryLightboxImage');
                this.galleryLightboxClose = document.getElementById('galleryLightboxClose');
                this.galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
                this.galleryLightboxNext = document.getElementById('galleryLightboxNext');
                this.galleryLightboxCounter = document.getElementById('galleryLightboxCounter');
                this.galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
                this.galleryLightboxCurrentIndex = 0;
                
                // Initialize the carousel
                this.galleryInit();
            }
            
            galleryInit() {
                // Clone slides for infinite effect
                this.galleryCloneSlides();
                
                // Create dots
                // this.galleryCreateDots();
                
                // Bind events
                this.galleryBindEvents();
                this.galleryBindLightboxEvents();
                
                // Position the carousel
                this.galleryUpdateCarousel();
                
                // Start autoplay
                this.galleryStartAutoPlay();
            }
            
            galleryCloneSlides() {
                // Create clones for infinite scrolling effect
                const fragmentStart = document.createDocumentFragment();
                const fragmentEnd = document.createDocumentFragment();
                
                // Clone first 3 slides to the end
                for (let i = 0; i < 3; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentEnd.appendChild(clone);
                }
                
                // Clone last 3 slides to the beginning
                for (let i = this.galleryTotalSlides - 3; i < this.galleryTotalSlides; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentStart.appendChild(clone);
                }
                
                // Append clones to track
                this.galleryTrack.prepend(fragmentStart);
                this.galleryTrack.appendChild(fragmentEnd);
                
                // Setup image click events for all slides
                this.gallerySetupImageClickEvents();
            }
            
            gallerySetupImageClickEvents() {
                const slides = this.galleryTrack.querySelectorAll('.gallery-slide');
                slides.forEach((slide, index) => {
                    const img = slide.querySelector('.gallery-image');
                    img.addEventListener('click', () => {
                        // Calculate original image index
                        const totalSlides = slides.length;
                        const originalIndex = (index - 3 + totalSlides) % this.galleryTotalSlides;
                        this.openGalleryLightbox(originalIndex);
                    });
                });
            }
            
            // galleryCreateDots() {
            //     for (let i = 0; i < this.galleryTotalSlides; i++) {
            //         const galleryDot = document.createElement('button');
            //         galleryDot.className = 'gallery-dot';
            //         galleryDot.addEventListener('click', () => this.galleryGoToSlide(i));
            //         this.galleryDotsContainer.appendChild(galleryDot);
            //     }
            // }
            
            galleryBindEvents() {
                this.galleryPrevBtn.addEventListener('click', () => this.galleryPrevSlide());
                this.galleryNextBtn.addEventListener('click', () => this.galleryNextSlide());
                
                // Touch events for mobile
                let galleryStartX = 0;
                let galleryEndX = 0;
                
                this.galleryTrack.addEventListener('touchstart', (e) => {
                    galleryStartX = e.touches[0].clientX;
                },{passive:true});
                
                this.galleryTrack.addEventListener('touchend', (e) => {
                    galleryEndX = e.changedTouches[0].clientX;
                    const galleryDiff = galleryStartX - galleryEndX;
                    
                    if (Math.abs(galleryDiff) > 50) {
                        if (galleryDiff > 0) {
                            this.galleryNextSlide();
                        } else {
                            this.galleryPrevSlide();
                        }
                    }
                },{passive:true});
                
                // Pause autoplay on hover
                this.galleryTrack.addEventListener('mouseenter', () => this.galleryStopAutoPlay());
                this.galleryTrack.addEventListener('mouseleave', () => this.galleryStartAutoPlay());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.galleryPrevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.galleryNextSlide();
                    } else if (e.key === 'Escape' && this.galleryLightbox.classList.contains('active')) {
                        this.closeGalleryLightbox();
                    }
                });
            }
            
            galleryBindLightboxEvents() {
                // Close lightbox events
                this.galleryLightboxClose.addEventListener('click', () => this.closeGalleryLightbox());
                this.galleryLightbox.addEventListener('click', (e) => {
                    if (e.target === this.galleryLightbox) {
                        this.closeGalleryLightbox();
                    }
                });
                
                // Lightbox navigation
                this.galleryLightboxPrev.addEventListener('click', () => this.galleryLightboxPrevImage());
                this.galleryLightboxNext.addEventListener('click', () => this.galleryLightboxNextImage());
            }
            
            openGalleryLightbox(index) {
                this.galleryLightboxCurrentIndex = index;
                this.galleryLightboxImage.src = this.galleryImages[index];
                // this.galleryLightboxTitle.textContent = this.galleryTexts[index];
                this.updateGalleryLightboxCounter();
                this.galleryLightbox.classList.add('active');
                this.galleryStopAutoPlay();
                document.body.style.overflow = 'hidden';
            }
            
            closeGalleryLightbox() {
                this.galleryLightbox.classList.remove('active');
                this.galleryStartAutoPlay();
                document.body.style.overflow = 'auto';
            }
            
            galleryLightboxPrevImage() {
                this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
                this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
                // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
                this.updateGalleryLightboxCounter();
            }
            
            galleryLightboxNextImage() {
                this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex + 1) % this.galleryTotalSlides;
                this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
                // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
                this.updateGalleryLightboxCounter();
            }
            
            updateGalleryLightboxCounter() {
                this.galleryLightboxCounter.textContent = `${this.galleryLightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
            }
            
            galleryUpdateCarousel() {
                const gallerySlides = this.galleryTrack.querySelectorAll('.gallery-slide');
                // const galleryDots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');
                
                // Calculate which slide is in the center
                const galleryIsMobile = window.innerWidth <= 576;
                const galleryCenterIndex = galleryIsMobile ? 
                    this.galleryPosition + 1 : 
                    this.galleryPosition + 1;
                
                // Update center slide highlighting
                // gallerySlides.forEach((slide, index) => {
                //     slide.classList.remove('gallery-center');
                //     if (index === galleryCenterIndex) {
                //         slide.classList.add('gallery-center');
                //     }
                // });
                
                // Update active dot
                // galleryDots.forEach((dot, index) => {
                //     dot.classList.remove('gallery-active');
                //     if (index === this.galleryCurrentIndex) {
                //         dot.classList.add('gallery-active');
                //     }
                // });
                
                // Move carousel
                const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
                const galleryTranslateX = -(this.galleryPosition * gallerySlideWidth);
                this.galleryTrack.style.transform = `translateX(${galleryTranslateX}%)`;
            }
            
            galleryNextSlide() {
                if (this.galleryIsTransitioning) return;
                this.galleryIsTransitioning = true;
                
                this.galleryPosition++;
                this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryTotalSlides;
                
                this.galleryUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
                    if (this.galleryPosition >= totalSlides - 3) {
                        this.galleryTrack.style.transition = 'none';
                        this.galleryPosition = 3;
                        
                        const galleryIsMobile = window.innerWidth <= 576;
                        const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
                        this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;

                        // gallerySlides[index].classList.add("gallery-center");
                        setTimeout(() => {
                            this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.galleryIsTransitioning = false;
                }, 600);
            }
            
            galleryPrevSlide() {
                if (this.galleryIsTransitioning) return;
                this.galleryIsTransitioning = true;
                
                this.galleryPosition--;
                this.galleryCurrentIndex = (this.galleryCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
                
                this.galleryUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    if (this.galleryPosition <= 0) {
                        this.galleryTrack.style.transition = 'none';
                        const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
                        this.galleryPosition = totalSlides - 6;
                        const galleryIsMobile = window.innerWidth <= 576;
                        const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
                        this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.galleryIsTransitioning = false;
                }, 600);
            }
            
            galleryGoToSlide(index) {
                if (this.galleryIsTransitioning || index === this.galleryCurrentIndex) return;
                
                this.galleryIsTransitioning = true;
                
                // Calculate the difference
                const diff = index - this.galleryCurrentIndex;
                this.galleryPosition += diff;
                this.galleryCurrentIndex = index;
                
                this.galleryUpdateCarousel();
                
                setTimeout(() => {
                    this.galleryIsTransitioning = false;
                }, 600);
            }
            
            galleryStartAutoPlay() {
                this.galleryStopAutoPlay();
                this.galleryAutoPlayInterval = setInterval(() => {
                    this.galleryNextSlide();
                }, 5000);
            }
            
            galleryStopAutoPlay() {
                if (this.galleryAutoPlayInterval) {
                    clearInterval(this.galleryAutoPlayInterval);
                    this.galleryAutoPlayInterval = null;
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new GalleryCarousel();
        });



        //Location JS
        let accordionBtn = document.querySelectorAll(".location-accordionBtn");
        let accordionContent = document.querySelectorAll(".location-accordionContent");
        let accordionArrow = document.querySelectorAll(".location-accordionArrow");
        accordionBtn.forEach((element,index)=>{
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                if (accordionContent[index].classList.contains("location-accordionContent-visible")){
                    accordionContent[index].classList.remove("location-accordionContent-visible");
                    accordionArrow[index].classList.remove("location-arrowActive");
                    return;
                }
                for (let i=0;i<accordionBtn.length;i++) {
                    accordionContent[i].classList.remove("location-accordionContent-visible");
                    accordionArrow[i].classList.remove("location-arrowActive");
                }
                accordionContent[index].classList.add("location-accordionContent-visible");
                accordionArrow[index].classList.add("location-arrowActive");
            })
        })
