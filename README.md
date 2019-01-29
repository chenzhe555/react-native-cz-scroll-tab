
# react-native-cz-scroll-tab

## Getting started

`$ npm install react-native-cz-scroll-tab --save`

### Mostly automatic installation

`$ react-native link react-native-cz-scroll-tab`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-cz-scroll-tab` and add `RNCzScrollTab.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCzScrollTab.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.chenzhe.scrolltab.RNCzScrollTabPackage;` to the imports at the top of the file
  - Add `new RNCzScrollTabPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-cz-scroll-tab'
  	project(':react-native-cz-scroll-tab').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-cz-scroll-tab/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-cz-scroll-tab')
  	```


## Usage
```javascript
import RNCzScrollTab from 'react-native-cz-scroll-tab';

// TODO: What to do with the module?
RNCzScrollTab;
```
  