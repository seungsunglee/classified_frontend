import React from 'react'

import { format } from 'date-fns'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const PaymentHistoryAccordion = ({ paymentHistory, ...props }) => (
  <Accordion elevation={3} {...props}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      id={paymentHistory.id}
      sx={{
        '& .MuiAccordionSummary-content': {
          flexDirection: 'column',
          pr: 3,
          overflow: 'hidden',
        },
      }}
    >
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {format(new Date(paymentHistory.created_at), 'yyyy/MM/dd')}
      </Typography>
      <Typography variant='body2' noWrap>
        {paymentHistory.item}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ pb: 3 }}>
      <Stack spacing={3}>
        <div>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            お支払い日時
          </Typography>
          <Typography>
            {format(new Date(paymentHistory.created_at), 'yyyy/MM/dd HH:mm')}
          </Typography>
        </div>
        <div>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            プロモーション対象
          </Typography>
          <Typography>{paymentHistory.item}</Typography>
        </div>
        <div>
          <Typography variant='body2' color='text.secondary' mb={1}>
            お支払い内容
          </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead
                sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
              >
                <TableRow>
                  <TableCell>名称</TableCell>
                  <TableCell align='right'>期間</TableCell>
                  <TableCell align='right'>金額 (AUD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.options.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>{option.type.name}</TableCell>
                    <TableCell align='right'>{option.term}日間</TableCell>
                    <TableCell align='right'>${option.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>合計</TableCell>
                  <TableCell align='right'>
                    ${paymentHistory.total_price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Stack>
    </AccordionDetails>
  </Accordion>
)

export default PaymentHistoryAccordion
