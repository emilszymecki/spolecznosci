const timer = () => {
	
	let time = 0
	
	const add = (val) => {
			time += 1
		}

    let clock 

	return {
		play: () => clock = setInterval(add,100),
		check: () => console.log(time),
		stop: () => {
			clearInterval(clock)
			console.log(time)
		},
		reset:()=>{
			clearInterval(clock)
			time = 0
			console.log(time)
		}
	}
}
