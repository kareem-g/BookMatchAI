import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import DropDown, { CategoryType } from "@/components/DropDown";
import LoadingDots from "@/components/LoadingDots";
import ResizablePanel from "@/components/ResizablePanel";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Header from "@/components/Header";
import Github from "@/components/Github";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Fiction");
  const [generatedBooks, setGeneratedBooks] = useState<String>("");
  console.log(category);
  console.log("Streamed response: ", generatedBooks);

  const prompt =
    category === "Fiction"
      ? `Generate 5 Fiction Books and clearly labeled "1." and "2." and "3." and "4.". Make sure it is like Book Name - Auther Name. Make sure each generated book is Worth Reading and base it on this context: ${category}${
          description.slice(-1) === "." ? "" : "."
        }`
      : `Generate 5 ${category} Books and clearly labeled "1." and "2." and "3." and "4.". Make sure it is like Book Name - Auther Name. Make sure each generated book is Worth Reading and base it on this context: ${description}${
          category.slice(-1) === "." ? "" : "."
        }`;

  const generateBook = async (e: any) => {
    e.preventDefault();
    setGeneratedBooks("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBooks((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>BookMatchAI - Customized book suggestions powered by AI!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/kareem-g/BookMatchAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-4xl text-2xl max-w-2xl font-bold text-slate-900">
          Customized book suggestions powered by AI.
        </h1>
        <p className="text-slate-500 mt-5">+1000 Books generated so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Summarize your book/topic for personalized suggestions{" "}
              <span className="text-slate-500">
                (or write a few sentences about it)
              </span>
              .
            </p>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Suggest A Similar book to Rich Dad Poor Dad. or AI Taking over the world Book."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your Category.</p>
          </div>
          <div className="block">
            <DropDown
              category={category}
              setCategory={(newCategory) => setCategory(newCategory)}
            />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBook(e)}
            >
              Generate your Books &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedBooks && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your Generated Books
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedBooks
                      .split(/\d+\.\s/)
                      .filter((generatedBook) => generatedBook)
                      .map((generatedBook) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedBook);
                              toast("Book Details copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedBook}
                          >
                            <div>{generatedBook.trim()}</div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
