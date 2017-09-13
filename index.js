/* jshint node: true */
'use strict';
const path = require('path');
const map = require('broccoli-stew').map;
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-slick',

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  treeForVendor(defaultTree) {
    let scPath = path.join(this.project.root, 'bower_components', 'slick-carousel', 'slick');
    let browserVendorLib = new Funnel(scPath);

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    if (defaultTree !== undefined) {
      trees.push(defaultTree);
    }

    trees.push(browserVendorLib);

    return new MergeTrees(trees);
  },

  included(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/slick.css');
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/slick.js');
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/slick-theme.css');
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/fonts/slick.ttf', { destDir: 'assets/fonts' });
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/fonts/slick.svg', { destDir: 'assets/fonts' });
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/fonts/slick.eot', { destDir: 'assets/fonts' });
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/fonts/slick.woff', { destDir: 'assets/fonts' });
    this.app.import(app.bowerDirectory + '/slick-carousel/slick/ajax-loader.gif', { destDir: 'assets' });
  }
};
