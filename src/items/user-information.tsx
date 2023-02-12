export default function Page({ data }) {
    console.log("user data rendered");
    return (
    <div className="flex gap-2 ">
        <div><img className="bord-r-8 w-50px h-50px" src={data.image} alt="" /></div>
        <div className="flex-col flex-align-start Q_md_x">
            <div className="">{data.name}</div>
            <div>{data.email}</div>
        </div>
    </div>
    )
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
