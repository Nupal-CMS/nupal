### Nupal

Run `yarn install`

Set the `.env` variables

To bundle the client TypeScript, run `npm run build`

Start it with `node index.js`

### Modules

Create a directory with a good machine name in `modules`.

Create a module file in that folder with the same machine name, eg. `modules/machine_name/machine_name.js`.

Create a `machine_name.routing.yml` file. Follow Symfony standards.

Every module must have a `machine_name.js` and a `machine_name.routing.yml` file, in a `machine_name` directory. But you can add whatever you want in your module folders.

### Routing

Every module's machine name is the first argument in all its routes. In `machine_name.js` export constants, one for each route. These will be referenced in the `machine_name.routing.yml` file.

### Views

Here's a little table explaining how the view-finder middleware works:

| Theme | Path                   | View                                       |
|-------|------------------------|--------------------------------------------|
| face  | /admin                 | views/face/admin/index.html.twig           |
| face  | /beef                  | views/face/beef/index.html.twig            |
| face  | /admin/modules         | views/face/admin/modules.html.twig         |
| face  | /admin/modules/confirm | views/face/admin/modules/confirm.html.twig |
| face | /api/something/get     | views/face/api/something/get.html.twig     

The API is like this:
```
res.twig()

// or

res.twig({
    firstName: 'Dave'
})
```

These are equal to:

```
res.render('/some/annoying/absolute/path/views/face/admin/index.html.twig')

// and

res.render('/some/annoying/absolute/path/views/face/admin/index.html.twig', {
    firstName: 'Dave'
})
```

You still have access to `res.end`, `res.send`, and `res.render`, `res.twig` just autoloads templates for fun if you want to use it.

### YAML

The `machine_name.routing.yml` file lightly mimicks Symfony's standards. Here's the one for the `admin` module:

```
// found in src/controllers/admin.js
export const modules = (req, res) => {
    ...
}

// found in YAML
admin.modules:
  path: '/modules' # will route to /admin/modules
  defaults:
    _title: 'Modules'
    _controller: 'admin:modules'
```

### Theme
I'm working on the first theme. But right now the API is like this: `git clone` a theme into `views`, and change it in the `config/core.system.yml` file. Look at what I've said about routing earlier.

### TypeScript
The entrypoint to the JavaScript front end is `src/index.ts`

### SCSS
The entrypoint to the CSS front end is `src/index.scss`
