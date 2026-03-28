import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

export default function App() {
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
    telefone: "(11) 98765-4321",
  };

  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        <View style={styles.card}>
          <View
            style={[
              styles.statusBadge,
              consulta.status === "confirmada" && styles.statusConfirmada,
              consulta.status === "cancelada" && styles.statusCancelada,
            ]}
          >
            <Text style={styles.statusTexto}>
              {consulta.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.secao}>
            <Text style={styles.label}>Médico</Text>
            <Text style={styles.valor}>{consulta.medico.nome}</Text>
            <Text style={styles.info}>CRM: {consulta.medico.crm}</Text>
            <Text style={styles.info}>
              {consulta.medico.especialidade.nome}
            </Text>
          </View>

          <View style={styles.secao}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.valor}>{consulta.paciente.nome}</Text>
            <Text style={styles.info}>CPF: {consulta.paciente.cpf}</Text>
            <Text style={styles.info}>Email: {consulta.paciente.email}</Text>
            {consulta.paciente.telefone && (
              <Text style={styles.info}>Tel: {consulta.paciente.telefone}</Text>
            )}
          </View>

          <View style={styles.secao}>
            <Text style={styles.label}>Dados da Consulta</Text>
            <Text style={styles.valor}>Data: {formatarData(consulta.data)}</Text>
            <Text style={styles.valor}>
              Valor: {formatarValor(consulta.valor)}
            </Text>
            {consulta.observacoes && (
              <Text style={styles.observacoes}>{consulta.observacoes}</Text>
            )}
          </View>

          <View style={styles.acoes}>
            {consulta.status === "agendada" && (
              <>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Confirmar Consulta"
                    onPress={confirmarConsulta}
                    color="#4CAF50"
                  />
                </View>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Cancelar Consulta"
                    onPress={cancelarConsulta}
                    color="#F44336"
                  />
                </View>
              </>
            )}

            {consulta.status === "confirmada" && (
              <View style={styles.mensagem}>
                <Text style={styles.mensagemTexto}>
                  Consulta confirmada com sucesso!
                </Text>
              </View>
            )}

            {consulta.status === "cancelada" && (
              <View style={styles.mensagemCancelada}>
                <Text style={styles.mensagemTexto}>
                  Consulta cancelada
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F8FAFC",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 16,
    color: "#CBD5F5",
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 24,
  },

  statusBadge: {
    backgroundColor: "#F59E0B",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
    marginBottom: 20,
  },

  statusConfirmada: {
    backgroundColor: "#10B981",
  },

  statusCancelada: {
    backgroundColor: "#EF4444",
  },

  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },

  secao: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#38BDF8",
    marginBottom: 6,
  },

  valor: {
    fontSize: 18,
    color: "#F1F5F9",
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    color: "#94A3B8",
  },

  observacoes: {
    fontSize: 14,
    color: "#CBD5F5",
    fontStyle: "italic",
    marginTop: 8,
  },

  acoes: {
    marginTop: 14,
  },

  botaoContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  mensagem: {
    backgroundColor: "#064E3B",
    padding: 14,
    borderRadius: 10,
  },

  mensagemCancelada: {
    backgroundColor: "#7F1D1D",
    padding: 14,
    borderRadius: 10,
  },

  mensagemTexto: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  rodape: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#1E293B",
    borderRadius: 12,
  },

  rodapeTexto: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },
});