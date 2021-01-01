import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  id?: number
  name?: string
}

export const ProjectDialog: React.FC<Props> = ({ open, onClose, id, name }) => {
  const [newId, setNewId] = useState(id)
  const [newName, setNewName] = useState(name)

  // props が変更されたら状態を再度初期化する
  // FIXME: Hooks の使い方がこれであってるか確認する
  useEffect(() => {
    setNewId(id)
    setNewName(name)
  }, [id, name])

  const isNew = id && name

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>{name || '新規プロジェクト'}</DialogTitle>
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
        <Button color="primary">保存</Button>
        <Button color="default">キャンセル</Button>
        <Button color="secondary">削除</Button>
      </DialogActions>

      <style jsx>{`
        .form {
          display: flex;
        }
      `}</style>
    </Dialog>
  )
}
