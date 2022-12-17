// my-module-resolve.js
/* 
there was a issue for jest yml running on Github action,
and this was one of the solutions: https://github.com/firebase/firebase-js-sdk/issues/5687,
it might or might not work on different version since it was specific for one of the firebase version.
In the future try comment out this one to test jest, if works then delete this file*/
module.exports = (request, options) => {
    // Call the defaultResolver, so we leverage its cache, error handling, etc.
    return options.defaultResolver(request, {
      ...options,
      // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
      packageFilter: pkg => {
        if(pkg.name.startsWith('@firebase')) {
          return {
            ...pkg,
            // Alter the value of `main` before resolving the package
            main: pkg.esm5 || pkg.module,
          };
        }
  
        return pkg;
      },
    });
  };
