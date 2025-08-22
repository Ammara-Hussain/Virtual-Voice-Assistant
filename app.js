//Linking UI to javascript
const btn=document.querySelector('#btn');
const content=document.getElementById('content');
const voice=document.getElementById('voice');
//In order to make the assistant speak, we have a class in javascript
function speak(text){
    const text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="en-GB";

    window.speechSynthesis.speak(text_speak); //calling the speak function

}
function wishMe(){
    const day=new Date();   //object creation
    const hours=day.getHours();
//for morning hours
if(hours>=5 && hours<12){
    speak("Good Morning ");

}else if (hours>=12 && hours<17){
    speak ("Good AfterNoon ");
}else if (hours>=16 && hours <21){
    speak("Good Evening ")
}else {
    speak("Good Night")
}
}
window.addEventListener('load',()=>{
    wishMe();
});           //As the page is loaded, speak function is invoked

//In order to make it intelligent
//1) fix the languages for it
//2) To enable speech recognition here
//recognizes whatever we speak
// 2 types of recognition based on the browser
//speech recognition
//webkit recognition
/*const speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
const recognition=new speechRecognition(); 
//When voice is recognized , what happens?
recognition.onresult=(event)=>{
    console.log(event);
}
btn.addEventListener("click",()=>{
    recognition.start();
})*/
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

// Set language (English / Arabic)
recognition.lang = "en-GB";   // change to "ar-SA" for Arabic
recognition.interimResults = false; // only final results

// When voice is recognized
recognition.onresult = (event) => {
    const currentIndex=event.resultIndex; //stores the phrases we say
    const transcript=event.results[currentIndex][0].transcript;//contains all the phrases we said
    content.innerText=transcript   //HTML span content is assigned
  takeCommand(transcript);
  recognition.stop(); //recognition stops once we stop speaking
}

// Button click starts recognition
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display="none";
    voice.style.display="block";
});
function takeCommand(message){       //include function looks for a particular text
    message=message.toLowerCase();
    btn.style.display="flex";
    voice.style.display="none";
   content.style.display="none";
   content.innerText="hidden";
    if(message.includes("hello")||message.includes("Hey")){
        speak("Hi, how can I help you?");
    }else if(message.includes("who are you")){
        speak("I am a Virtual Assistant, assisting users in doing multiple tasks through automation.");

    }else if(message.includes("open my personal youtube channel")){
        speak("Opening Your Youtube Channel");
        window.open("https://www.youtube.com/@TheArabicStarter");

    }else if(message.includes("open my linkedin profile")){
        speak("Opening Your LinkedIn Profile");
        window.open("https://www.linkedin.com/in/ammara-hussain-045241331/");
    }else if(message.includes("open my writing profile")){
        speak("Opening Your Substack Profile");
        window.open("https://substack.com/@ammarahussain?utm_source=user-menu");
    
    
    
    } 
    //.toLocaleString method works only for the time formatting, it can give time and date by default but cannot provide the day and month
    else if(message.includes( "time")){            
        const time=new Date().toLocaleString([],{hour:"2-digit",minute:"2-digit"});
        speak("The time is "+time);
    
    
    
    
    } else if(message.includes("date")){
        const date=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long", year:"numeric"});
        speak("the date is" +date);



    }
    //Fallback Search on Google

    else{
        const finalText="this is what i found on internet regarding" + message.replace("Gemini","");
        
        speak(finalText);
       window.open(`https://www.google.com/search?q=${message}`);

        }
    }



