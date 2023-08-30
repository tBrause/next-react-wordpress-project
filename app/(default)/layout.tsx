import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};
export default function layout({ children }: Props) {
	return <main className="default-layout">{children}</main>;
}
