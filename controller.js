angular
    .module('myApp', ['ngMaterial'])            
    .controller('controller',function($scope,$interval){  
        
        $scope.trans = json;
        $scope.isPlaying = false;
        $scope.song = document.createElement('audio');
        $scope.song.src='./assets/sounds/audio.wav'
        $scope.pause_loc = 0;
        $scope.lastloc = 0;
        $scope.progressbar = 0;

        //to load duration upon metadata load
        $scope.song.addEventListener('loadedmetadata',function(){
            $scope.duration = changeTimeFormat($scope.song.duration);    
            });

        //function to play
        $scope.play = function(){
            $scope.song.currentTime = $scope.pause_loc;
            $scope.song.play();
            };

        //function to pause
        $scope.pause = function(){
            $scope.pause_loc = $scope.song.currentTime;
            $scope.song.pause();
        };
        
        // button to play or pause
        $scope.playOrpause = function () {
            $scope.isPlaying = !$scope.isPlaying;
            if ($scope.val === 'play')
                {
                $scope.val='pause';
                $scope.play();
                }
            else
                {
                $scope.val="play";    
                $scope.pause();
                }
        };

        //to present time in mm:ss format
        function changeTimeFormat(input){
            var addZero;
            input = Math.ceil(input);
            var minutes = Math.floor(input/60);
            var seconds = input - minutes*60;
            if(seconds<10) addZero = "0";
            else addZero="";
            var returnFormat = minutes+":"+addZero+seconds;
            return returnFormat;
        }

        //to change volume using slider
        var volSlider = document.getElementById('volRange');
        volSlider.onchange = function (){
            $scope.song.volume = volSlider.value/100;
        }

        // to change speed using slider
        var speedSlider = document.getElementById('speedRange');
        speedSlider.onchange = function (){
            $scope.song.playbackRate = speedSlider.value/100;
        }

        //to mute the audio
        $scope.volume = $scope.song.volume;
        var muteBtn = document.getElementById('mute');
        muteBtn.onclick = function() {
            if($scope.song.volume === 0)
            {
                $scope.song.volume = $scope.volume;
            }
            else
            {
                $scope.volume = $scope.song.volume;
                $scope.song.volume = 0;
            }
        }

        // to stop song playback
        var stopbtn = document.getElementById('stopbtn');
        stopbtn.onclick = function() {
            $scope.val="play";    
            $scope.pause();
            $scope.progressbar = 0;
            $scope.song.currentTime = 0;
            $scope.pause_loc = 0;
            $scope.lastloc = 0;
        }
        
        // to set time on slider change
        $scope.timeSet = function (input){
            $scope.song.currentTime=input;
        }
        
        // to update the values in page
        $interval(function(){
            $scope.lastloc = changeTimeFormat($scope.song.currentTime);
            $scope.progressbar = Math.round(($scope.song.currentTime/$scope.song.duration)*100);
        })
    });