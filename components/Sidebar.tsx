import Link from 'next/link'
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'
import TimerIcon from '@material-ui/icons/Timer'
import SettingsIcon from '@material-ui/icons/Settings'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="header">工数クラウド</h1>
      <hr className="line" />
      <ul className="menu-list">
        <li className="menu-list-item selected">
          <Link href="/">
            <a>
              <ListAltIcon />
              <label>プロジェクト一覧</label>
            </a>
          </Link>
        </li>
        <li className="menu-list-item">
          <Link href="/">
            <a>
              <TimerIcon />
              <label>集計</label>
            </a>
          </Link>
        </li>
        <li className="menu-list-item">
          <Link href="/">
            <a>
              <EditIcon />
              <label>工数入力</label>
            </a>
          </Link>
        </li>
        <li className="menu-list-item">
          <Link href="/">
            <a>
              <SettingsIcon />
              <label>設定</label>
            </a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          width: 100%;
          height: 100%;
          padding: 15px;
          box-sizing: border-box;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          color: #fff;
          background-color: rgb(3, 15, 44);

          .header {
            margin: 0;
            padding: 10px;
            text-align: center;
          }
          .line {
            opacity: 0.4;
          }
          .menu-list {
            padding-left: 20px;
            padding-right: 20px;
            .menu-list-item {
              display: flex;
              align-items: center;
              height: 70px;
              font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
              font-weight: 300;
              line-height: 1.5em;
              list-style-type: none;
              &.selected {
                background-color: #00acc1;
              }
              a {
                display: flex;
                text-decoration: none;
                &:visited {
                  color: #fff;
                }
                label {
                  margin-left: 5px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  )
}
