
const dashboardActions = [
    1, 2, 3, 4, 5, 6,
]


const style={
    dashboardActionStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        height: '200px',
        width: '200px',
        margin: '0px 5px',
        color: 'black',
        cursor: 'pointer',
    }
}

const Dashboard = () => {
    return <>
        <div style={{
            padding: '60px',
            height: '1000px',
            background: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img 
            style={{
                marginBottom: '30px'
            }}
                width='300px' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/TK_archive_icon.svg/1024px-TK_archive_icon.svg.png" alt=""></img>
            <h1
            style={{
                fontSize: '80px',
                fontWeight: 'bolder',
            }}>Online Docs</h1>
            <p style={{ fontSize: '15px', margin: '60px 0px 30px 0px'}}>
            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature
            </p>

            <div style={{
                width: '100%',
                display: 'flex',

            }}>
            {
                dashboardActions.map((e, idx) => {

                    return <div 
                        className="dashboard-actions"
                        style={style.dashboardActionStyle}>
                        Ação {idx + 1}
                    </div>
                })
            }
        </div>
        </div>
    
    </>
}

export default Dashboard