import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect, useState } from 'react'

type Props = {
  id: number
  name: string
  onUpdate: (newId: number, newName: string) => void
  onDelete: () => void
  onClose: () => void
}

export const ProjectEditDialog: React.FC<Props> = props => {
  const [newId, setNewId] = useState(props.id)
  const [newName, setNewName] = useState(props.name)

  // props が変更されたら状態を再度初期化する
  // FIXME: Hooks の使い方がこれであってるか確認する
  useEffect(() => {
    setNewId(props.id)
    setNewName(props.name)
  }, [props.id, props.name])

  const isValid = newId && newName

  return (
    <Dialog open onClose={props.onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>{props.name}</DialogTitle>
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
        <Button color="primary" disabled={!isValid} onClick={() => props.onUpdate(newId, newName)}>
          更新
        </Button>
        <Button color="secondary" onClick={() => props.onDelete()}>
          削除
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
