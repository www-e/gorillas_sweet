# Instagram Feed Implementation Guide

## Overview
This document outlines how to implement an Instagram feed display on the Gorilla Sweet website that works with GitHub Pages constraints, focusing on methods that don't require exposing API keys or server-side processing.

## Current Situation
The website already has a "Social" section in `components/social.html` with an Instagram card, but it currently uses static placeholder images instead of a dynamic feed.

## Recommended Solutions

### Option 1: Official Instagram Embeds (Manual)
This is the most reliable method that works with GitHub Pages and doesn't require API keys.

#### Implementation:
1. Create individual Instagram posts you want to feature
2. Get the embed code for each post from Instagram:
   - Open the Instagram post
   - Click the "..." menu
   - Select "Embed"
   - Copy the provided HTML code
3. Add the embed codes to the Instagram section in `components/social.html`

#### Pros:
- Officially supported by Instagram
- No API keys required
- Works reliably on GitHub Pages

#### Cons:
- Manual process for each post
- Not a dynamic feed of recent posts

### Option 2: Third-party Widget Services
These commercial services handle the Instagram API authentication and provide embed codes.

#### Recommended Services:
1. **Lightwidget** (https://lightwidget.com/)
2. **Elfsight** (https://elfsight.com/)
3. **SnapWidget** (https://snapwidget.com/)

#### Implementation:
1. Sign up for one of the services
2. Connect your Instagram account
3. Configure the widget appearance
4. Copy the provided embed code
5. Replace the current Instagram section in `components/social.html` with the widget code

#### Example Implementation with Lightwidget:
```html
<!-- Replace the current Instagram card content with this -->
<div class="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-pink-200">
  <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
  <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-pink-100 opacity-70 group-hover:scale-150 transition-transform duration-700"></div>
  
  <div class="relative z-10">
    <div class="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.668.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    </div>
    
    <h3 class="text-2xl font-bold text-center mb-3 transition-colors duration-300" 
        style="color: var(--text-secondary, #6D2E4D);">Instagram</h3>
    
    <p class="text-gray-500 text-center mb-6">
      Visual feast of our creations, behind-the-scenes moments, and customer spotlights
    </p>
    
    <!-- Instagram Feed Widget -->
    <div class="lightwidget-widget mb-6">
      <iframe src="//lightwidget.com/widgets/your-widget-code.html" 
              scrolling="no" 
              allowtransparency="true" 
              class="lightwidget-iframe" 
              frameborder="0" 
              style="width: 100%; border: 0; overflow: hidden;"></iframe>
    </div>
    
    <a href="https://www.instagram.com/your-instagram-handle/" 
       class="block w-full py-3 text-center font-bold rounded-full transition-all duration-300 group-hover:scale-105"
       style="background: linear-gradient(to right, #6D2E4D, #8C3A63); color: white;"
       target="_blank">
      Follow @your-instagram-handle
    </a>
  </div>
</div>
```

### Option 3: RSS-based Solution (Experimental)
Some third-party services convert Instagram feeds to RSS format, which can then be parsed client-side.

#### Implementation:
1. Find a service that converts Instagram to RSS (like inst-rss.appspot.com)
2. Use a JavaScript RSS parser to fetch and display the feed
3. Style the results to match the current design

#### Example Implementation:
```html
<!-- Add this to the Instagram card in components/social.html -->
<div id="instagram-feed" class="grid grid-cols-3 gap-2 mb-6">
  <!-- Feed will be populated by JavaScript -->
</div>
```

```javascript
// Add this to js/main.js or create a new instagram-feed.js file
async function loadInstagramFeed() {
  try {
    // Note: This is a third-party service and may not be reliable
    const rssUrl = 'https://inst-rss.appspot.com/rss/your-instagram-username';
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      const feedContainer = document.getElementById('instagram-feed');
      if (feedContainer) {
        // Clear existing content
        feedContainer.innerHTML = '';
        
        // Add up to 6 latest posts
        data.items.slice(0, 6).forEach(item => {
          const imgSrc = item.enclosure?.link || item.thumbnail;
          if (imgSrc) {
            const imgElement = document.createElement('div');
            imgElement.className = 'w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow';
            imgElement.innerHTML = `<img src="${imgSrc}" alt="Instagram post" class="w-full h-full object-cover">`;
            feedContainer.appendChild(imgElement);
          }
        });
      }
    }
  } catch (error) {
    console.error('Error loading Instagram feed:', error);
  }
}

// Call this function after the social component is loaded
// Add this to the initialization in main.js
if (document.getElementById('social-component')) {
  loadInstagramFeed();
}
```

## Recommendation

For the Gorilla Sweet website, I recommend using **Option 2 (Third-party Widget Services)** for the following reasons:

1. It provides a dynamic feed of recent Instagram posts
2. It works reliably with GitHub Pages
3. It doesn't require exposing API keys
4. It maintains the visual design of the existing site
5. It's easy to implement and maintain

The Instagram card in `components/social.html` can be easily modified to include the widget embed code while preserving the existing styling and branding elements.

## Implementation Steps

1. Choose a third-party widget service (Lightwidget is recommended for its free tier)
2. Sign up and connect your Instagram account
3. Configure the widget to match the existing design
4. Replace the placeholder images in the Instagram card with the widget embed code
5. Test the implementation on a local server before deploying
6. Update the "Follow @gorillas_sweet" link to point to your actual Instagram handle

This approach will provide a professional-looking Instagram feed that automatically updates with your latest posts while maintaining compliance with Instagram's terms of service.