import { ReactNode } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    maxHeight: '100%'
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }
})

type Prop = {
  headerValues: string[]
  bodyValuesList: (string | number)[][]
  onClickRow: (row: number) => void
}

export const BaseTable: React.FC<Prop> = ({ headerValues, bodyValuesList, onClickRow }) => {
  const styles = useStyles()

  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          {headerValues.map(value => (
            <TableCell>{value}</TableCell>
          ))}
        </TableHead>
        <TableBody>
          {bodyValuesList.map((bodyValues, index) => (
            <TableRow className={styles.row} onClick={() => onClickRow(index)}>
              {bodyValues.map(value => (
                <TableCell>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BaseTable
