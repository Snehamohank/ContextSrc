import React from 'react';
import { Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
  title: 'Take Image',
};

const file_types = [
  'TIF',
  'TIFF',
  'JPG',
  'JPEG',
  'GIF',
  'PNG',
  'WEBP',
  'PDF',
  'XLS',
  'DOC',
  'XLSX',
  'CSV',
  'HEIF',
  'HEIC',
];

const image_types = [
  'TIF',
  'TIFF',
  'JPG',
  'JPEG',
  'GIF',
  'PNG',
  'WEBP',
  'HEIF',
  'HEIC',
];

const extension = (filename) => {
  var r = /.+\.(.+)$/.exec(filename);
  return r ? r[1].toUpperCase() : null;
};

export const LaunchCamera = () =>
  new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      width: 1024,
      height: 1024,
      quality: 0.8,
      cropping: true,
    }).then((response) => {
      let path = response.path;

      path = '~' + path.substring(path.indexOf('/Documents'));

      let fileName = path.split('/').pop();

      if (file_types.indexOf(extension(fileName)) > -1) {
        if (
          image_types.indexOf(extension(fileName)) > -1 &&
          response.size / 1024 / 1024 > 1
        ) {
          ImageResizer.createResizedImage(
            response.path,
            1024,
            1024,
            'JPEG',
            100,
            0,
          )
            .then((res) => {
              const image = {
                uri: res.uri,
                name: fileName,
                size: response.size,
                type: response.mime,
              };

              resolve(image);
            })
            .catch((err) => {
              reject('Error', err);
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
        } else {
          const res = {
            uri: response.path,
            name: fileName,
            size: response.size,
            type: response.mime,
          };

          resolve(res);
        }
      } else {
        alert('Only Image or PDF Supported');
      }
    });
  });

export const ImageSinglePicker = () =>
  new Promise((resolve, reject) => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.error) {
        reject('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        reject('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.assets[0],"response.assets[0]");
        let path = response.assets[0].uri;

        path = '~' + path.substring(path.indexOf('/Documents'));

        let fileName = path.split('/').pop();

        if (
          file_types.indexOf(
            extension(
              Platform.OS === 'ios'
                ? response.assets[0].uri
                : response.assets[0].fileName,
            ),
          ) > -1
        ) {
          if (
            image_types.indexOf(
              extension(
                Platform.OS === 'ios'
                  ? response.assets[0].uri
                  : response.assets[0].fileName,
              ),
            ) > -1 &&
            response.assets[0].fileSize / 1024 / 1024 > 1
          ) {
            ImageResizer.createResizedImage(
              response.assets[0].uri,
              1024,
              1024,
              'JPEG',
              100,
              0,
            )
              .then((res) => {
                const image = {
                  uri: res.uri,
                  name:
                    Platform.OS === 'android'
                      ? response.assets[0].fileName
                      : fileName,
                  size: response.assets[0].fileSize,
                  type: response.assets[0].type,
                };

                resolve(image);
              })
              .catch((err) => {
                reject('Error', err);
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
              });
          } else {
            const res = {
              uri: response.assets[0].uri,
              name:
                Platform.OS === 'android'
                  ? response.assets[0].fileName
                  : fileName,
              size: response.assets[0].fileSize,
              type: response.assets[0].type,
            };

            resolve(res);
          }
        } else {
          alert('Only Image or PDF Supported');
        }
      }
    });
  });
