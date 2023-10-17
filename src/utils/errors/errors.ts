import { HttpStatus } from '@nestjs/common';
//TOODO: ALTERAR O RETORNO DOS ERROS statusCode
export const ERROS = {
  MONGO_DB: {
    UPDATE_EXCEPTION: {
      code: 1000,
      message: 'Erro no mongodb ao atualizar os dados!!',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    GET_LIST_EXCEPTION: {
      code: 1001,
      message: 'Erro no mongodb ao listar os dados!!',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    GET_ONE_EXCEPTION: {
      code: 1002,
      message: 'Erro no mongodb ao recuperar os dados!!',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  },

  SCHEDULE: {
    NOT_FOUND_EXCEPTION: {
      code: 2000,
      message: 'Nenhuma agendamento foi encontrado!',
      statusCode: HttpStatus.NOT_FOUND,
    },
    CANCEL_EXCEPTION: {
      code: 2001,
      message: 'Erro ao realizar o cancelamento do agendamento!',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    ALREADY_HAVE: {
      code: 2002,
      message: 'já existe um agendamento confirmado para está reserva!!',
      statusCode: HttpStatus.AMBIGUOUS,
    },
    TIME_HAS_RUN_OUT: {
      code: 2003,
      message: 'O tempo para realizar o agendamento foi finalizado, por favor realize os passos novamente!',
      statusCode: HttpStatus.ACCEPTED,
    },
    MORE_THAN_ONE_SAME_TIME: {
      code: 2004,
      message: 'Não é possível realizar mais de um agendamento seguidos!',
      statusCode: HttpStatus.AMBIGUOUS,
    },
  },
};
