import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import React, { useEffect, useState } from 'react'
import { DialogTitle } from '@material-ui/core'

type Props = {
  onCreate: (newId: number, newName: string) => void
  onClose: () => void
}

export const ProjectCreateDialog: React.FC<Props> = props => {
  const [newId, setNewId] = useState(0)
  const [newName, setNewName] = useState('')
  const isValid = newId && newName

  return (
    <Dialog open onClose={props.onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>プロジェクト新規作成</DialogTitle>
      <DialogContent>
        <div className="form">
          <TextField
            id="id"
            className="id-field"
            label="ID"
            type="number"
            value={newId}
            onChange={e => setNewId(Number(e.target.value))}
            style={{ width: '120px' }}
          />
          <TextField
            id="name"
            label="プロジェクト名"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            fullWidth={true}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" disabled={!isValid} onClick={() => props.onCreate(newId, newName)}>
          作成
        </Button>
        <Button color="default" onClick={props.onClose}>
          キャンセル
        </Button>
      </DialogActions>

      <style jsx>{`
        .form {
          display: flex;
        }
      `}</style>
    </Dialog>
  )
}
