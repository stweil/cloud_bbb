import React, {useState} from 'react';
import { SubmitInput } from './SubmitInput';

type EditableValueProps = {
    value: string;
	setValue: (key: string, value: string | number) => Promise<void>;
	field: string;
	type: 'text' | 'number';
}

const EditableValue: React.FC<EditableValueProps> = ({ setValue, field, value: currentValue, type }) => {
	const [active, setActive] = useState<boolean>(false);

	const submit = (value: string | number) => {
		if (value === currentValue) {
			setActive(false);
			return;
		}

		setValue(field, value).then(() => {
			setActive(false);
		});
	};

	if (active) {
		return <SubmitInput
			name={field}
			autoFocus={true}
			onSubmitValue={(value) => submit(type === 'number' ? parseInt(value) : value)}
			onClick={event => event.stopPropagation()}
			initialValue={currentValue}
			type={type}
			focus={true}
		/>;
	}

	function onClick(ev) {
		ev.stopPropagation();

		setActive(true);
	}

	return <a className="action-rename" onClick={onClick}>{currentValue}</a>;
};

export default EditableValue;