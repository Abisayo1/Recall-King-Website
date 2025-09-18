import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.recallking.app";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href =
        "https://apps.apple.com/app/recall-king/id6746662865";
    } else {
      window.location.href = "https://www.therecallking.com";
    }
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Redirecting...</h1>
        <p className="mt-2 text-gray-600">
          We’re sending you to the right store for your device.
        </p>
      </div>
    </div>
  );
}
