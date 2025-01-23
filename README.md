# export-reddit-saved

A web app project which allows you to login with your Reddit credentials and return all images saved on your account.
Built using basic HTML and CSS, with Python serving as the backend via Flask.

# How to start:

Navigate to the root directory (`/export-reddit-saved`) of this project and enter in a terminal:

```
flask run
```

Open another terminal then navigate to the frontend folder (`/export-reddit-saved/frontend`), and enter:

```
npm run dev
```

The web app should be working and fully functional.

Checklist:
- [x] Login working correctly
- [x] Basic login page
- [x] Migrate project to use React frontend and Tailwind CSS instead of basic HTML/CSS
- [ ] Sort out display bugs
- [ ] Style pages better for better UX
- [ ] Revamp picture size calculation formula

- [ ] Fix many Image errors in console
- [ ] consider moving some of the side information on top of the page instead
- [ ] add logout button
- [ ] separate tailwind code from tsx files
- [ ] add error handling if flask server isn't active