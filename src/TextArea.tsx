import { useEffect, useRef, useState } from 'react'

type TextAreaProps = {
	value: string
	onChange: (new_value: string) => void
}

function TextArea(props: TextAreaProps) {
	const testArea = useRef<HTMLTextAreaElement>(null)

	const [height, setHeight] = useState(0) // TestArea height
	const listen = useRef(false)
	const [actualHeight, setActualHeight] = useState(0) // TextArea height

	useEffect(() => {
		listen.current = false
		setHeight(0)

		setTimeout(() => {
			if (testArea.current) {
				listen.current = true
				setHeight(testArea.current.scrollHeight)
			}
		}, 0)
	}, [props.value])
	useEffect(() => {
		if (!listen.current) return

		setActualHeight(height)
	}, [height])

	return (
		<>
			<textarea
				className="resize-none w-full rounded-lg p-2 min-h-[6rem] max-h-[50vh]"
				style={{ height: actualHeight + 'px' }}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
			></textarea>

			{/* Using this to calculate our height */}
			<textarea
				ref={testArea}
				aria-hidden="true"
				className="absolute left-0 top-0 invisible select-none resize-none w-full rounded-lg p-2 min-h-[6rem] max-h-[50vh]"
				style={{ height: height + 'px' }}
				value={props.value}
				readOnly
			></textarea>
		</>
	)
}

export default TextArea
