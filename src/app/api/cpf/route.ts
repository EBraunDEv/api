import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export async function PATCH(request: NextRequest) {
  try {
    const { CPF } = await request.json();

    if (!CPF) {
      return NextResponse.json({ error: "CPF é obrigatório." }, { status: 400 });
    }

    // Fazendo a requisição ao Supabase
    const { data, error } = await supabaseClient
      .from('Servicos_Urbanos')
      .select('*')
      .eq('CPF', CPF)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao acessar o banco de dados." },
        { status: 500 }
      );
    }

    // Verifica se o CPF já está cadastrado
      if (data) {
      return NextResponse.json({
      message: "CPF já cadastrado.",
      CPF: CPF,
      userData: data
      }, { status: 200 });
    }

    return NextResponse.json({
      message: "CPF não encontrado. Deseja se cadastrar?",
      CPF: CPF,
    }, { status: 200 });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Método não permitido." },
    { status: 405 }
  );
}