export default function ProductTabs({ activeTab, onChange }) {
    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-6">

                <button
                    onClick={() => onChange("published")}
                    className={`pb-3 text-sm font-medium ${activeTab === "published"
                        ? "text-black border-b-3 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        } hover:cursor-pointer`}
                >
                    Published
                </button>


                <button
                    onClick={() => onChange("unpublished")}
                    className={`pb-3 text-sm font-medium ${activeTab === "unpublished"
                        ? "text-black border-b-3 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                        } hover:cursor-pointer`}
                >
                    Unpublished
                </button>
            </div>
        </div>
    );
}
