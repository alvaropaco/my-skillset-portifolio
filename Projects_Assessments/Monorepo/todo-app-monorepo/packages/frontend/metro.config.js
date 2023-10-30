const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'cjs', 'mjs'],
      extraNodeModules: {
        components: __dirname + '/packages/frontend',
        graphql: path.resolve(__dirname, '../../node_modules/graphql')
      },
      resolverMainFields: ['browser', 'module', 'main'],
    },
  };
})();
