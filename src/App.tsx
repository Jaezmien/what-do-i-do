import debounce from 'lodash/debounce'
import { useEffect, useRef, useState } from 'react'
import TextArea from './TextArea'

const updateLocalStorage = debounce((list) => {
	console.log('update!')
	localStorage.setItem('wdid', list.join('\n'))
}, 1000)

function App() {
	const [list, setList] = useState<string[]>([])
	const enableSave = useRef(false)
	const [toDo, setToDo] = useState<string | null>(null)

	useEffect(() => {
		if (localStorage.getItem('wdid')) setList(localStorage.getItem('wdid')!.split('\n'))
		enableSave.current = true
	}, [])

	useEffect(() => {
		if (!enableSave.current) return
		updateLocalStorage(list)
	}, [list])

	function roll_list() {
		setToDo(list.length < 1 ? null : list[Math.floor(Math.random() * list.length)])
	}

	return (
		<div className="App min-h-screen w-full flex flex-col place-items-center justify-center px-4">
			<header className="text-center">
				<h1 className="text-4xl sm:text-6xl font-semibold">What do I do?</h1>
				<p className="opacity-80 italic text-xs sm:text-base">A small app to decide things for you.</p>
			</header>

			<main className="my-4 w-full max-w-sm px-2">
				<div className="h-full">
					<TextArea value={list.join('\n')} onChange={(v) => setList(v.split('\n'))}></TextArea>

					<div className="mx-auto mt-4 w-fit">
						<button
							className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg"
							onClick={roll_list}
						>
							What do I do?
						</button>
					</div>
				</div>

				{toDo !== null && (
					<div className="mt-4 text-center">
						💡 You should do: <b>{toDo}</b>!
					</div>
				)}
			</main>

			<footer className="text-center mt-4">
				<p>
					Made with React and 💙 by{' '}
					<a className="underline" href="https://jaezmien.github.io">
						Jaezmien Naejara
					</a>
				</p>
			</footer>
		</div>
	)
}

export default App
