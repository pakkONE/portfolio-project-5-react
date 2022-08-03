# PP5 React - SportsTalk

## Project description

SportsTalk is a content sharing platform that connects people from all four corners of the earth to share knowledge in what they are passionate about.<br>The platform is powered by a Django REST API and React.
This Readme contains only to the front end part and the back end part can be found [here](https://github.com/pakkONE/portfolio-project-5-api/blob/main/README.md)

## User stories

| Category | as a    | I would like to                    | so that I can                                                | UI components                                                   |
| -------- | ------- | ---------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| AUTH     | visitor | sign up for an account             | have a personal profile with a picture                       | SignUpPage<br>SignInPage<br>ProfilePage<br>EditProfileForm      |
| AUTH     | visitor | sign up for an account             | create, like and comment on posts                            | CreatePostPage<br>PostList<br>Comment                           |
| NAVBAR   | user    | access relevant links of the site  | so that I can navigate to the different pages of the website | NavBar                                                          |
| PROFILES | user    | view a profile                     | learn more about the user and see all their posts            | ProfilePage<br>EditProfileForm<br>EditDropdown                  |
| PROFILES | user    | edit my profile                    | keep the information about myself up to date                 | EditProfileForm<br>ChangePasswordForm<br>ChangeUsernameForm     |
| POSTS    | visitor | view list of posts from users      | stay up to date with the most recent posts                   | PostList                                                        |
| POSTS    | visitor | view a specific post               | see the engagement                                           | PostDetail<br>ViewPostPage                                      |
| POSTS    | visitor | search for a post                  | find a post by title or author                               | PostList<br>SearchBar                                           |
| POSTS    | visitor | keep scrolling to fetch more posts | have a smooth browsing experience                            | InfinteScrollComponent                                          |
| POSTS    | user    | create a post                      | share my ideas with the community                            | CreatePostPage                                                  |
| POSTS    | user    | edit and delete my post            | correct mistakes or remove posts I regret                    | EditPostPage<br>EditDropdown                                    |
| LIKES    | user    | like a post that I enjoy           | let the author know about that                               | PostDetail<br>PostList<br>likeicon                              |
| LIKES    | user    | unlike a post                      | regret my like or correct a mistaken like                    | PostDetail<br>PostList<br>likeicon                              |
| COMMENTS | user    | comment on a post                  | share my thoughts on about the topic                         | PostDetail<br>Comment<br>CreateCommentForm                      |
| COMMENTS | user    | edit or delete my comment          | correct mistakes or remove comments I regret                 | Comment<br>CreateCommentForm<br>EditCommentForm<br>EditDropdown |

## Popular components:

- PostList:
  - Feed
- InfinteScrollComponent:
  - PostList, PostDetail (for comments), ProfilePage
- PostDetail:
  - Likes, Comments
- EditDropdown
  - EditPostPage, EditProfileForm, EditCommentForm

## Wireframes

![wireframe of landing page when logged out](https://res.cloudinary.com/dv6cgny0t/image/upload/v1658832818/Landing_Page_logged_out_jdggqu.png)
![wireframe of landing page when logged in](https://res.cloudinary.com/dv6cgny0t/image/upload/v1658832819/Landing_Page_logged_in_aqg4f7.png)
![wireframe of add post page](https://res.cloudinary.com/dv6cgny0t/image/upload/v1658832818/Add_Post_ri7pwd.png)
![wireframe of profile page](https://res.cloudinary.com/dv6cgny0t/image/upload/v1658832818/Profile_page_grdgra.png)

## Color palette

![image of color palette from a website](https://res.cloudinary.com/dv6cgny0t/image/upload/v1658825176/COLOR_PALETTE_motwus.png)

- I used this color palette because it fit well with how I intended the logo design to be.

## Sprints (link to my KANBAN can be found [here](https://github.com/users/pakkONE/projects/3/views/1))

- Sprint 1 (Navbar)
  - This sprint focused on creating the NavBar component so that users can navigate their way around on the page.
- Sprint 2 (Signup/Signin pages)
  - This sprint was about giving visitors the ability to create an account as well as logging in.
- Sprint 3 (Posts)
  - As the site is a content sharing platform, a key component of this app is for users to be able to create posts, and edit or delete them.<br>So in this sprint the focus was on getting all those components up and running.
- Sprint 4 (Likes)
  - This sprint added the ability for users to like and unlike posts that are not their own.
- Sprint 5 (Comments)
  - This sprint focused on giving the users the ability to comment on posts to engage in topics they love.<br>The users also get to edit or delete their own comments.
- Sprint 6 (Profiles)
  - This sprint aimed to create Profiles components for users to share more about themselves.

## Tests

### Manual Testing

- Profiles:

  - Visitor can:
    - View all Profiles but not Create, update or delete any any profiles
  - Authenticated user can:
    - Create a profile
    - edit their profile (username, password, profile image)
    - Add display name and a bio

- Posts:

  - Visitor can:
    - View all posts but not Create, update or delete any posts
  - Authenticated user can:
    - Create posts
    - Edit or delete their own posts
  - Images are being validated to be smaller than 4096pixels in width, height as well as 2MB in size.
    - File type is also being validates as only images are allowed

- Comments:

  - Visitor can:
    - View all comments but not Create, update or delete any comments
  - Authenticated user can:
    - Create comments on posts
    - Edit or delete their own comments

- Likes:
  - Visitor can:
    - View all likes but not Create or delete any likes
  - Authenticated user can:
    - Create likes on posts
    - Delete their own likes

### Bugs

-

## Deployment

- In package.json file, in the “scripts” section, add the following prebuild command:
  - `"heroku-prebuild": "npm install -g serve",`
- Add a Procfile at the root of the project with the following web command:
  - `web: serve -s build`
- Comment out all console.logs
  - (I chose to leave them instead of removing them completely so that it is easier to debug if some issues would arise)
- Used Bootstraps default imports so that the import load isn't heavy on the app
- Deploy to Heroku

Live React Project can be found [here](https://pp5-react.herokuapp.com/)

## Libraries and contexts:

- Libraries:
  - react-infinite-scroll-component
    - A component to make all your infinite scrolling woes go away by removing pagination and only load more data if user is scrolling far enough.
  - react-bootstrap
    - React-Bootstrap is a complete re-implementation of the Bootstrap components using React. It has no dependency on either bootstrap.js or jQuery. If you have React setup and React-Bootstrap installed, you have everything you need.
  - react-router-dom
    - React Router is a fully-featured client and server-side routing library for React, a JavaScript library for building user interfaces. React Router runs anywhere React runs; on the web, on the server with node.js, and on React Native.
  - axios
    - Promise based HTTP client for the browser and node.js
  - jwt-decode
    - jwt-decode is a small browser library that helps decoding JWTs token which are Base64Url encoded.
- Contexts:
  - UserContext
    - Used to allow other components always having the current logged in users data available
  - ProfileContext
    - Used to let components know which profile to render

## CREDITS

- Logo created by using [this template on Canva.com](https://www.canva.com/p/templates/EAE5TZbIJzE-tan-brown-cream-black-white-health-wellness-fitness-chiropractic-logo/)
- Favicon generated by [https://favicon.io/](https://favicon.io/favicon-converter/)
- Color Palette generated by [Colormind](http://colormind.io/image/) using the logo as inspiration
- Thanks to [Code Institute](https://www.codeinstitute.net/) staff for the Moments Walkthrough Project that gave me loads of inspiration to this project.
