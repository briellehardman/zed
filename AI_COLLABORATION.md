# AI Collaboration Log

Swipe & Bite was my idea from the beginning. I came up with the concept, the swipe experience, the recipe and restaurant sections, the Saved section, the map feature, the travel use case, and the photo rules. I used AI to help me code, debug, and understand how to build those ideas, but the ideas and design decisions were mine.

## Tools I Used

I used ChatGPT and Boilerplate while building Swipe & Bite. I also used VS Code and GitHub Pages to test and publish the app.

I used AI mostly to help me:

- write and revise code
- debug problems
- understand unfamiliar code
- improve the design and user experience
- organize restaurant data
- improve restaurant photos
- work through map problems

## How My Prompting Changed

At the beginning, my prompts were much more general. I would ask AI to add a feature without explaining exactly how I wanted it to work.

As I kept building, I realized I got much better results when I explained what part of the app I was working on, what data the feature used, what should happen when the user clicked something, what should not change, and what could go wrong.

The ideas themselves stayed mine. What changed was how specifically I learned to explain them to AI so the code matched what I pictured.

For example, instead of just saying "add a map," I explained that the map should only show saved restaurants, use their latitude and longitude, zoom to the selected city, and show the user's location only after permission was given.

## Significant Conversation 1: Planning the Core App

My first major AI conversation was about the basic idea for Swipe & Bite.

I wanted an app that worked like a dating app for food. Users could swipe through recipes and restaurants, choose yes or no, and save the ones they liked.

I came up with the idea and the main sections:

- Cook at Home
- Eat Out
- Saved

AI helped me think through how to organize and build those ideas.

## Significant Conversation 2: Learning the Map Technique

One feature I had never built before was an interactive map.

The map feature was my idea. I came up with it because I had experienced the problem myself while traveling. I had saved restaurants but could not easily tell which one was closest to me.

AI helped me understand how to build that idea.

I learned that each restaurant needs latitude and longitude coordinates. Leaflet can use those coordinates to place markers on a map.

I also learned about:

- map markers
- fitBounds()
- latitude and longitude
- city filtering
- browser geolocation
- calculating distance between the user and a restaurant

This became the main new technique I learned during the project.

## Significant Conversation 3: Debugging the Map

The hardest debugging problem was the map background.

The restaurant pins were showing, but the map itself displayed errors such as 403 Access Blocked.

At first I thought the entire map was broken.

AI helped me understand that the map had separate parts. The restaurant marker logic was working, but the outside service providing the map background was having problems.

I had to test different fixes and look at how the app behaved in VS Code compared with GitHub Pages.

This taught me that I should identify the exact part of a feature that is failing instead of assuming the whole feature is broken.

## Significant Conversation 4: Improving Restaurant Photos

The photo rules were my decision.

I did not want users making a swipe decision based on logos, event posters, blank screens, broken images, or bad photos.

I decided that the photos users click through before swiping should only show:

- food
- restaurant interiors
- restaurant exteriors

AI helped me think through how to separate those swipe photos from the larger customer photo gallery.

The decision about what photos should appear was mine.

## Significant Conversation 5: Learning About Saved Data

I asked AI to explain why saved restaurants could appear in the Saved List but not on the map.

I learned that the restaurant could be saved in localStorage without valid latitude and longitude coordinates.

I also learned that older saved objects with null coordinates could sometimes overwrite newer restaurant data depending on how the objects were merged.

This helped me understand how saved data and current data can interact.


## Challenges

The biggest challenges were:

- map provider errors
- missing restaurant coordinates
- saved restaurants not appearing on the map
- broken or low-quality photos
- keeping old saved data working after restaurant data changed
- making sure the app worked on GitHub Pages and not only in VS Code
- preventing blank images and layout problems while swiping

## What I Learned

The biggest thing I learned was that AI works better when I give it very specific instructions.

I also learned that I still need to test everything myself.

AI could suggest code and explain problems, but I had to decide:

- what the app should do
- which features were useful
- what photos were acceptable
- how the swipe experience should feel
- what information should be shown
- which features were worth keeping
- when it was better to leave something out instead of using unreliable information

The ideas and user experience for Swipe & Bite came from me. AI helped me turn those ideas into working code and troubleshoot problems along the way.