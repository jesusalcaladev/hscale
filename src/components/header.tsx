export const Header = () => {
	return (
		<header className="flex z-10 w-[80%] px-10 flex-row items-center justify-between py-10 pb-12">
			<h1 className="text-2xl font-bold">HSCALE</h1>
			<a
				className="hover:scale-110 hover:opacity-90 transition-all hover:cursor-pointer block"
				href="https://github.com/jesusalcaladev/hscale"
				target="_blank"
				rel="noopener noreferrer"
			>
				Github
			</a>
		</header>
	);
};
