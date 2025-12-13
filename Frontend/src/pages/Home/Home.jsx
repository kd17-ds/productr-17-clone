import { useState } from "react";
import ProductTabs from "../../components/ProductTabs";
import EmptyState from "../../components/EmptyState";

export default function Home() {
    const [activeTab, setActiveTab] = useState("published");

    return (
        <div>
            <ProductTabs activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-16">
                <EmptyState
                    icon="/centric-icon.png"
                    title={
                        activeTab === "published"
                            ? "No Published Products"
                            : "No Unpublished Products"
                    }
                    subtitle={
                        activeTab === "published"
                            ? "Your Published Products will appear here"
                            : "Your Unpublished Products will appear here"
                    }
                />
            </div>
        </div>
    );
};

