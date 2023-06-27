const PFPs = document.querySelectorAll('.pfp');
const usernames = document.querySelectorAll('.username');
let count = 0;

PFPs.forEach(pfp => {
	let url = '/profile/' + usernames[count].innerHTML;
	pfp.addEventListener('click', () => {
		window.location.href = url;
	});
	count++;
});

usernames.forEach(username => {
	username.addEventListener('click', () => {
		window.location.href = '/profile/' + username.innerText;
	});
});