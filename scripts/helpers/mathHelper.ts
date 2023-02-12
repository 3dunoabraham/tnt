export const lerp = (start, end, amt) =>{
	return (1-amt)*start+amt*end
}
export const getRandomInt = (max=6) =>{
	return Math.floor(Math.random() * max); 
}
export const getFixedLengthRandomInt = (len) =>{
	return Math.random().toString().slice(2,len+2);
}
