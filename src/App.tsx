import { useEffect, useState } from "react";

function App() {
    const [text, setText] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [separator, setSeparator] = useState<string>("-");
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        const result = text
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, separator)
            .replace(new RegExp(`\\${separator}+`, "g"), separator);

        setSlug(result);
    }, [text, separator]);

    const handleCopy = () => {
        navigator.clipboard.writeText(slug).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        });
    };

    return (
        <>
            <section>
                <h1>Slugify</h1>
                <p>Slug Generator</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">
                            Text
                        </label>
                        <input
                            type="text"
                            name="text"
                            id="text"
                            className="form-control"
                            value={text}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setText(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Separate with...</label>

                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="separator"
                                    id="dash"
                                    value="-"
                                    checked={separator === "-"}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setSeparator(e.target.value)}
                                />
                                <label
                                    className="btn btn-primary w-100"
                                    htmlFor="dash"
                                >
                                    -
                                </label>
                            </div>
                            <div className="col-6">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="separator"
                                    id="underscore"
                                    value="_"
                                    checked={separator === "_"}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setSeparator(e.target.value)}
                                />
                                <label
                                    className="btn btn-primary w-100"
                                    htmlFor="underscore"
                                >
                                    _
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="slug" className="form-label">
                            Slug
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                className="form-control"
                                readOnly
                                value={slug}
                            />
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleCopy}
                            >
                                <i className="fa-solid fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </section>

            <div
                className={`toast position-fixed bottom-0 start-0 m-3 ${
                    showToast ? "show" : "hide"
                }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header">
                    <strong className="me-auto bh-info text-black">
                        Aviso
                    </strong>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowToast(false)}
                    ></button>
                </div>
                <div className="toast-body text-black">
                    Slug copiado com sucesso!
                </div>
            </div>
        </>
    );
}

export default App;
