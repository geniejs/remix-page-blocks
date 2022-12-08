import { FC, ReactElement } from "react";
import { BlockItem } from "~/application/dtos/BlockDto";

export default function blockExtender<P extends BlockItem>(WrappedComponent: FC<P>, props?: P): ReactElement<P, string> {
  return (
    <>
      {JSON.stringify(props)}
      <WrappedComponent {...(props as P)} />
    </>
  );
}
