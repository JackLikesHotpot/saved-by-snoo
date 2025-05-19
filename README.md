# Saved by Snoo

This web application was created using React and Next.js as frameworks, with a Flask/Python API setup on the backend and TypeScript on the frontend, styled with Tailwind CSS. This application allows Reddit users to view and filter up to 1000 of their saved posts. The app allows users to filter the posts by subreddit, title name, and the type of submission.

## Features:
- [x] Allows users to view their save images and videos
- [x] Allows users to filter their images/videos by types (gallery, video, image)
- [x] Allows users to view NSFW posts
- [x] Allows users to blur NSFW posts if viewing them
- [x] Responsive design for different devices
- [ ] Log out button
- [ ] Add 'sort' functions on page so users can sort by score, time or title.
- [ ] Create error page if user has no saved images


## Project Structure:
- **Backend**: A Node.JS API that handles authentication with Reddit and serves image data via Express.
- **Frontend**: A Next.js React app that communicates with the backend to display saved images.

I rewrote the API code with Express so I have to rewrite this part too. 

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
