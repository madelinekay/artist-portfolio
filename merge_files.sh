#!/usr/bin/env bash

pushd images/thumbnails
for file in *.jpg
do
    newfile=`echo $file | sed 's/thumbnail-\(.*\).jpg/carousel-\1-thumbnail.jpg/g'`;
    echo "renaming $file to $newfile";
    mv $file $newfile;
done
popd

mv images/thumbnails/* images/carousel
rmdir images/thumbnails/