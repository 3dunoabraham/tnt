export default function Page({ data }) {
    console.log("user data rendered");
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
