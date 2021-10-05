Explorer knockoff
========

issues: 

 - got rid of most of the design coz library cleaning... so yeah i need to polish the design i just kinda have no time for that yet....
 - the new animations might glitch something when pressing stuff too fast...
 - if you press on the refresh button on the options menu, the files/folders might disappear, to fix you must press the refresh button using the left softkey and then press up or down quickly.
 - when trying to open files you might need to click on it twice for the first time... i have no idea why....

added features: 
 - I tested my implementation of navigation i guess....
 - now the app remembers which folder/file was last focused in the current session.
 - now has mozActivity that can be used to play videos(detects if landscape or portrait) and also supports `.srt` and `.vtt` (special thanks to arma7x), after user exits the video app it will create postResult of a Blob that has the time of the video where the user was last watching.
 - now has "Set as Ringtone" option in option menu when picking `.mp3` or `.oog` files...(im not too sure which file formats should be added) 
 - now has mozActivity that can be used to play Music.~~now i have an urge to make my own music app~~

todo:
 - add better icons
 - ~~add softkeys~~ kinda done?
 - audio player with LRC support
 - image viewer

~~I'll get rid of those jquery stuff next... (don't think it's necessary with such simple stuff that vanilla js can do...)~~

lmao that was so easy i didn't even need to commit yet... like bruh wtf why would you need all of these libraries it makes absolutely no sense to use stuff that you can simply do with vanilla js....