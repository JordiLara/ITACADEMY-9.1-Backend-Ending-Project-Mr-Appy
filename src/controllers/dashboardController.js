import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import Team from "../models/teamModel.js";

// Obtener estadísticas de estados de ánimo
export const getMoodStatistics = async (req, res) => {
  try {
    const id_team = req.user.id_team;

    if (!id_team) {
      return res.status(400).json({
        code: -1,
        message: "No se encontró un equipo asociado al gerente",
      });
    }

    const moodStats = await Review.findAll({
      where: { id_team },
      attributes: ["mood"],
    });

    const moodDistribution = moodStats.reduce((acc, review) => {
      acc[review.mood] = (acc[review.mood] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      code: 1,
      message: "Estadísticas de estados de ánimo obtenidas correctamente",
      data: moodDistribution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Error al obtener estadísticas de estados de ánimo",
      error,
    });
  }
};

// Obtener reseñas recientes
export const getRecentReviews = async (req, res) => {
  try {
    const id_team = req.user.id_team;

    if (!id_team) {
      return res.status(400).json({
        code: -1,
        message: "No se encontró un equipo asociado al gerente",
      });
    }

    const reviews = await Review.findAll({
      where: { id_team },
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      code: 1,
      message: "Reseñas recientes obtenidas correctamente",
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Error al obtener reseñas recientes",
      error,
    });
  }
};

// Obtener actividad reciente del equipo
export const getTeamActivity = async (req, res) => {
  try {
    const id_team = req.user.id_team;

    if (!id_team) {
      return res.status(400).json({
        code: -1,
        message: "No se encontró un equipo asociado al gerente",
      });
    }

    const activity = await Review.findAll({
      where: { id_team },
      attributes: ["created_at", "content", "mood"],
      order: [["created_at", "DESC"]],
      limit: 10,
    });

    res.status(200).json({
      code: 1,
      message: "Actividad del equipo obtenida correctamente",
      activity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Error al obtener la actividad del equipo",
      error,
    });
  }
};