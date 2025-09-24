// components/SignaturePadComponent.tsx
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./ui/button";

type Props = {
  width?: number;
  height?: number;
};

const SignaturePadComponent = forwardRef<SignatureCanvas, Props>(
  ({ width = 500, height = 200 }, ref) => {
    const internalRef = useRef<SignatureCanvas>(null);
    const [isSigned, setIsSigned] = useState(false);

    useImperativeHandle(ref, () => internalRef.current!, []);

    const clear = () => {
      internalRef.current?.clear();
      setIsSigned(false);
    };

    const handleDrawEnd = () => {
      if (!isSigned) {
        setIsSigned(true);
      }
    };

    return (
      <div className="h-[280px]">
        <span className="text-center block">Buyerga imzo qo'ying</span>
        <SignatureCanvas
          ref={internalRef}
          onBegin={handleDrawEnd}
          penColor="black"
          canvasProps={{
            width: 300, // aniq width
            height: 200, // aniq height
            className:
              "border border-gray-400 rounded bg-white mx-auto", // ❌ w-full, h-[...] ni olib tashla!
          }}

        />

        {isSigned && (
          <div className="mt-2 flex justify-center gap-3 items-center w-full">
            <Button
              type="button"
              variant="destructive"
              onClick={clear}
              className="px-4 py-2 sm:w-max w-full max-w-[300px]"
            >
              Tozalash
            </Button>
          </div>
        )}
      </div>
    );
  }
);

SignaturePadComponent.displayName = "SignaturePadComponent";

export default SignaturePadComponent;

export function base64ToBlob(base64Data: string, contentType = "image/png") {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
}
