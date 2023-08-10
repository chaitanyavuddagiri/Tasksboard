// test-utils.tsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { TaskProvider } from "./context/TaskContext";

interface RenderProps {
	children: React.ReactNode;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (ui: React.ReactElement, options?: any) => {
	const Wrapper: React.FC<RenderProps> = ({ children }) => {
		return <TaskProvider>{children}</TaskProvider>;
	};

	return rtlRender(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// override render method
export { render };
